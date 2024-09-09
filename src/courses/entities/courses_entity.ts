import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Tag } from "./tags_entity"

@Entity('courses') /* defines the name of the table in the database, if not defined, the table name will be the name of the class */
export class Course {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    name: string

    @Column()
    description: string

    @JoinTable()
    @ManyToMany(() => Tag, tag => tag.courses)
    tags: Tag[]
}