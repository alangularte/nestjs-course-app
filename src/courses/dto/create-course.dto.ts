import { IsString } from "class-validator"

export class createCourseDTO {
    @IsString() /* data type validator decorator */
    readonly name: string

    @IsString()
    readonly description: string
    
    @IsString({each: true}) /* validates if each value of the array is a string */
    readonly tags: string[]
}