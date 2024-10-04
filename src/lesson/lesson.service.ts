import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import assignStudentsToLessonInput from './inputs/assign-students-to-lesson.input';
import CreateLessonInput from './inputs/create-lesson.input';
import Lesson from './lesson.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private readonly repository: Repository<Lesson>,
  ) {}

  async getAll(): Promise<Lesson[]> {
    return this.repository.find();
  }

  async getByid(id: string): Promise<Lesson> {
    return this.repository.findOneBy({ id });
  }

  async create(input: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate } = input;

    const lesson = this.repository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students: [],
    });

    return this.repository.save(lesson);
  }

  async assignStudentToLesson(
    input: assignStudentsToLessonInput,
  ): Promise<Lesson> {
    const { lessonId, studentIds } = input;

    const lesson = await this.repository.findOneBy({ id: lessonId });

    lesson.students = [...lesson.students, ...studentIds];

    return this.repository.save(lesson);
  }
}
