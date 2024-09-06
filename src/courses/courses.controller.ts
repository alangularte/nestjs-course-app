import { Controller, Get, Param, Body, Post, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { STATUS_CODES } from 'http';
import { createCourseDTO } from './dto/create-course.dto';
import { updateCourseDTO } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
    constructor(private readonly courseService: CoursesService) {}

    @Get()
    findAll() {
        return this.courseService.findAll()
    }

    /* receives a param */
    @Get(':id')
    listOne(@Param('id') id: number) {
        /* even the id param is defined as a number, it is received as a string */
        /* the + insures that the defined data type is used */
        /*return this.courseService.findOne(+id)*/

        /* the transform property from ValidatorPipe (main.ts) is enabled
        so it does not require the + anymore */
        return this.courseService.findOne(id)
    }

    @Post()
    create(@Body() createCourseDTO: createCourseDTO) {
        return this.courseService.create(createCourseDTO)
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateCourseDTO: updateCourseDTO) {
        return this.courseService.update(+id, updateCourseDTO)
    }

    @HttpCode(HttpStatus.NO_CONTENT) /* it indicates that no content will be returned to the client */
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.courseService.remove(+id)
    }
}
