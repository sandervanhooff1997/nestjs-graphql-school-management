import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import CreateStudentInput from './inputs/create-student.input';
import Student from './student.entity';

@Injectable()
export default class StudentService {
  constructor(
    @InjectRepository(Student) private readonly repository: Repository<Student>,
  ) {}

  async getAll(): Promise<Student[]> {
    return this.repository.find();
  }

  async getById(id: string): Promise<Student> {
    return this.repository.findOneBy({ id });
  }

  async getByIds(ids: string[]): Promise<Student[]> {
    return this.repository.find({
      where: { id: In(ids) }, // TODO: fix IN operator
    });
  }

  async create(input: CreateStudentInput): Promise<Student> {
    const { firstName, lastName } = input;

    const student = this.repository.create({
      id: uuid(),
      firstName,
      lastName,
    });

    return this.repository.save(student);
  }
}
