import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Student')
export default class StudentType {
  @Field((type) => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
