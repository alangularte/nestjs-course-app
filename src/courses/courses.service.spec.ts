import { CoursesService } from './courses.service';
import { randomUUID } from 'node:crypto';
import { createCourseDTO } from './dto/create-course.dto';
import { create } from 'node:domain';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { updateCourseDTO } from './dto/update-course.dto';

describe('CoursesService unit tests', () => {
  let service: CoursesService
  let id: string
  let created_at: Date
  let expectOutputTags: any
  let expectOutputCourses: any
  let mockCourseRepository: any
  let mockTagRepository: any

  beforeEach(async () => {
    service = new CoursesService()
    id = randomUUID()
    created_at = new Date
    expectOutputTags = [{
      id,
      name: 'nestjs',
      created_at
    }]
    expectOutputCourses = {
      id,
      name: 'test',
      description: 'test description',
      created_at,
      tags: expectOutputTags
    }

    mockCourseRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
    }

    mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn()
    }

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /* Unit Test for CreateCourse service */
  it('should create a course', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository

    const createCourseDTO: createCourseDTO = {
      name: 'test',
      description: 'test description',
      tags: ['nestjs']
    }

    const newCourse = await service.create(createCourseDTO)

    /* In the createCourse service it is expected that the Save method is also called */
    expect(mockCourseRepository.save).toHaveBeenCalled()

    /* We expect that the created course is exactly the same as defined previously */
    expect(expectOutputCourses).toStrictEqual(newCourse)
  });

  /* Unit Test for findAll service */
  it('should list all courses', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository

    const courses = await service.findAll()

    expect(mockCourseRepository.find).toHaveBeenCalled()
    expect(expectOutputCourses).toStrictEqual(courses)
  });

  /* Unit Test for findOne service */
  it('should list one course', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository

    const course = await service.findOne(id)

    expect(mockCourseRepository.findOne).toHaveBeenCalled()
    expect(expectOutputCourses).toStrictEqual(course)
  });

  /* Unit Test for update service */
  it('should update one course', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository

    const updateCourseDTO: updateCourseDTO = {
      name: 'test',
      description: 'test description',
      tags: ['nestjs']
    }

    const course = await service.update(id, updateCourseDTO)

    expect(mockCourseRepository.preload).toHaveBeenCalled()
    expect(mockCourseRepository.save).toHaveBeenCalled()
    expect(expectOutputCourses).toStrictEqual(course)
  });

  /* Unit Test for remove service */
  it('should remove one course', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository

    const course = await service.remove(id)

    expect(mockCourseRepository.findOne).toHaveBeenCalled()
    expect(mockCourseRepository.remove).toHaveBeenCalled()
    expect(expectOutputCourses).toStrictEqual(course)
  });
});
