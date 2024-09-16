import { DataSource } from "typeorm";
import { dataSourceOptions } from "./database.module";
import { CreateCoursesTable1725993581803 } from "src/migrations/1725993581803-CreateCoursesTable"
import { CreateTagsTable1725999670484 } from "src/migrations/1725999670484-CreateTagsTable"
import { CreateCoursesTagsTable1726001350400 } from "src/migrations/1726001350400-CreateCoursesTagsTable";
import { AddCoursesIdToCoursesTagsTable1726516144779 } from "src/migrations/1726516144779-AddCoursesIdToCoursesTagsTable";

export const dataSource = new DataSource({
    ... dataSourceOptions,
    synchronize: false,
    migrations: [
        CreateCoursesTable1725993581803, 
        CreateTagsTable1725999670484, 
        CreateCoursesTagsTable1726001350400, 
        AddCoursesIdToCoursesTagsTable1726516144779
    ]
})