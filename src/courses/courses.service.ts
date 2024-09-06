import { Body, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses_entity';
import { start } from 'repl';
import { findIndex } from 'rxjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoursesService {

    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>
    ){}

    async findAll() {
        return this.courses
    }

    async findOne(id: number) {
        const course = this.courses.find(course => course.id === id)
        if(!course) {
            /*throw new HttpException(`Course ID: ${id} not found`, HttpStatus.NOT_FOUND)*/
            throw new NotFoundException(`Course ID: ${id} not found`)
        }
        return course
    }

    async create(createCourseDTO: any) {
        this.courses.push(createCourseDTO)
        return createCourseDTO
    }

    async update(id: number, updateCourseDTO: any) {
        const existCourse = this.findOne(id)

        if(existCourse as any){
            const index = this.courses.findIndex(course => course.id === id)
            this.courses[index] = {
                id,
                ... updateCourseDTO
            }
        }
    }

    async remove(id: number) {
        const index = this.courses.findIndex(course => course.id === id)
        if(index >= 0){
            this.courses.splice(index, 1)
        }
    }
}


