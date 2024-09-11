import { DataSource } from "typeorm";
import { dataSourceOptions } from "./database.module";
import { CreateCoursesTable1725993581803 } from "src/migrations/1725993581803-CreateCoursesTable"
import { CreateTagsTable1725999670484 } from "src/migrations/1725999670484-CreateTagsTable"

export const dataSource = new DataSource({
    ... dataSourceOptions,
    synchronize: false,
    migrations: [CreateCoursesTable1725993581803, CreateTagsTable1725999670484]
})