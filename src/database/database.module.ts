import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/courses/entities/courses_entity';
import { Tag } from 'src/courses/entities/tags_entity';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'devtraining',
    entities: [Course, Tag],
    synchronize: true
}

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
        useFactory: async () => {
            return {
                ... dataSourceOptions
            }
        }
    })]
})

export class DatabaseModule {}
