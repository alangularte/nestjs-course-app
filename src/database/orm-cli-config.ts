import 'dotenv/config'
import { DataSource } from "typeorm";
import { CreateCoursesTable1725993581803 } from "src/migrations/1725993581803-CreateCoursesTable"
import { CreateTagsTable1725999670484 } from "src/migrations/1725999670484-CreateTagsTable"
import { CreateCoursesTagsTable1726001350400 } from "src/migrations/1726001350400-CreateCoursesTagsTable";
import { AddCoursesIdToCoursesTagsTable1726516144779 } from "src/migrations/1726516144779-AddCoursesIdToCoursesTagsTable";
import { AddTagsIdToCoursesTagsTable1726518460709 } from "src/migrations/1726518460709-AddTagsIdToCoursesTagsTable";
import { DataSourceOptions } from "typeorm";
import { Course } from "src/courses/entities/courses_entity";
import { Tag } from "src/courses/entities/tags_entity";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Course, Tag],
    synchronize: false
}

export const dataSource = new DataSource({
    ... dataSourceOptions,
    synchronize: false,
    migrations: [
        CreateCoursesTable1725993581803, 
        CreateTagsTable1725999670484, 
        CreateCoursesTagsTable1726001350400, 
        AddCoursesIdToCoursesTagsTable1726516144779,
        AddTagsIdToCoursesTagsTable1726518460709
    ]
})