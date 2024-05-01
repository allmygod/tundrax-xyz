import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';
import { User } from './user.entity';

export default Factory.define<User>(
  ({sequence}) => {
    return {
      id: sequence,
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      createdAt: new Date(),
      updatedAt: new Date(),
      passwordHash: "",
      roles: [],
      favorites: [],
    }
  }
)