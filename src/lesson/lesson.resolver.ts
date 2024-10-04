import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import StudentService from 'src/student/student.service';
import assignStudentsToLessonInput from './inputs/assign-students-to-lesson.input';
import CreateLessonInput from './inputs/create-lesson.input';
import Lesson from './lesson.entity';
import { LessonService } from './lesson.service';
import LessonType from './lesson.type';

@Resolver((of) => LessonType)
export default class LessonResolver {
  constructor(
    private readonly lessonService: LessonService,
    private readonly studentService: StudentService,
  ) {}

  @Query((returns) => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.getByid(id);
  }

  @Query((returns) => [LessonType])
  lessons() {
    return this.lessonService.getAll();
  }

  @Mutation((returns) => LessonType)
  createLesson(@Args('createLessonInput') input: CreateLessonInput) {
    return this.lessonService.create(input);
  }

  @Mutation((returns) => LessonType)
  assignStudentsToLesson(
    @Args('assignStudentsToLessonInput') input: assignStudentsToLessonInput,
  ) {
    return this.lessonService.assignStudentToLesson(input);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    const students = await this.studentService.getByIds(lesson.students);
    console.log(students);
    return students;
  }
}
