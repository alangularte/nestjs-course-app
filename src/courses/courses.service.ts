import { Body, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses_entity';
import { start } from 'repl';
import { findIndex } from 'rxjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createCourseDTO } from './dto/create-course.dto';

@Injectable()
export class CoursesService {

    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>
    ){}

    async findAll() {
        return this.courseRepository.find()
    }

    async findOne(id: number) {
        const course = await this.courseRepository.findOne({
            where: {id: id} /* or where: {id} as both column and param has the same name */
        })

        if(!course) {
            /*throw new HttpException(`Course ID: ${id} not found`, HttpStatus.NOT_FOUND)*/
            throw new NotFoundException(`Course ID: ${id} not found`)
        }
        return course
    }

    async create(createCourseDTO: any) {
        /* First, CREATE the entity */
        const course = this.courseRepository.create(createCourseDTO)

        /* Now SAVE the entity */
        return await this.courseRepository.save(course)
    }

    async update(id: number, updateCourseDTO: any) {
        const course = await this.courseRepository.preload({
            ... createCourseDTO,
            id
        })
        if (!course) {
            throw new NotFoundException(`Course ID: ${id} not found`)
        }
        return this.courseRepository.save(course)
    }

    async remove(id: number) {
        const course = await this.courseRepository.findOne({
            where: {id} /* it is equivalent to where{id:id} */
        })
        if (!course) {
            throw new NotFoundException(`Course ID: ${id} not found`)
        }
        return this.courseRepository.remove(course)
    }
}
