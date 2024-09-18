import { Body, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses_entity';
import { Tag } from './entities/tags_entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createCourseDTO } from './dto/create-course.dto';
import { updateCourseDTO } from './dto/update-course.dto';

@Injectable()
export class CoursesService {

    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>

    async findAll() {
        return this.courseRepository.find({
            relations: ['tags']
        })
    }

    async findOne(id: string) {
        const course = await this.courseRepository.findOne({
            where: { id: id } /* or where: {id} as both column and param has the same name */,
            relations: ['tags']
        })

        if(!course) {
            /*throw new HttpException(`Course ID: ${id} not found`, HttpStatus.NOT_FOUND)*/
            throw new NotFoundException(`Course ID: ${id} not found`)
        }
        return course
    }

    async create(createCourseDTO: createCourseDTO) {
        const tags = await Promise.all(
            createCourseDTO.tags.map(name => this.preloadTagByName(name))
        )

        /* First, CREATE the entity */
        const course = this.courseRepository.create({
            ...createCourseDTO,
            tags
        })

        /* Now SAVE the entity */
        return await this.courseRepository.save(course)
    }

    async update(id: string, updateCourseDTO: updateCourseDTO) {
        /* checks if tags is passed in the update call */
        /* if yes, then return the tags */
        const tags = updateCourseDTO.tags && 
        (await Promise.all(
            updateCourseDTO.tags.map(name => this.preloadTagByName(name))
        ))
        
        const course = await this.courseRepository.preload({
            ... createCourseDTO,
            id,
            tags
        })
        if (!course) {
            throw new NotFoundException(`Course ID: ${id} not found`)
        }
        return this.courseRepository.save(course)
    }

    async remove(id: string) {
        const course = await this.courseRepository.findOne({
            where: { id } /* it is equivalent to where{id:id} */
        })
        if (!course) {
            throw new NotFoundException(`Course ID: ${id} not found`)
        }
        return this.courseRepository.remove(course)
    }

    private async preloadTagByName(name: string): Promise<Tag> {
        const tag = await this.tagRepository.findOne({ 
            where: { name }
        })
        if(tag) {
            return tag
        }
        return this.tagRepository.create({ name })
    }
}
