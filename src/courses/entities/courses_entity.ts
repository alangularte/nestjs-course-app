import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Tag } from "./tags_entity"
import { randomUUID } from "crypto"

@Entity('courses') /* defines the name of the table in the database, if not defined, the table name will be the name of the class */
export class Course {
    
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column()
    name: string

    @Column()
    description: string

    @JoinTable()
    @ManyToMany(() => Tag, tag => tag.courses, {
        cascade: true,
        eager: true
    })
    tags: Tag[]

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date

    @BeforeInsert()
    generatedId() {
        if(this.id) {
            return
        }
        this.id = randomUUID()
    }
}