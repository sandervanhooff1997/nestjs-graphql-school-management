import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import CreateStudentInput from './inputs/create-student.input';
import StudentService from './student.service';
import StudentType from './student.type';

@Resolver((of) => StudentType)
export default class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query((returns) => StudentType)
  student(@Args('id') id: string) {
    return this.studentService.getById(id);
  }

  @Query((returns) => [StudentType])
  students() {
    return this.studentService.getAll();
  }

  @Mutation((returns) => StudentType)
  createStudent(@Args('createStudentInput') input: CreateStudentInput) {
    return this.studentService.create(input);
  }
}
