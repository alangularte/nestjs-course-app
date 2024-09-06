import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('courses') /* defines the name of the table in the database, if not defined, the table name will be the name of the class */
export class Course {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    name: string

    @Column()
    description: string

    @Column({type: 'json', nullable: true}) /* it means that it can have null values */
    tags: string[]
}