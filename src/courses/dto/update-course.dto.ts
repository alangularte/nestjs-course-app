import { PartialType } from "@nestjs/mapped-types";
import { createCourseDTO } from "./create-course.dto";

export class updateCourseDTO extends PartialType(createCourseDTO){
    /* ? means optional  */
    /* the update service does not require that all fields should be updated */
    /*readonly name?: string
    readonly description?: string
    readonly tags?: string[]*/
}