import AuthValidateUserService from './auth.validate-user.service';
import { User } from '../../users/user.entity';
import { Repository } from 'typeorm';
import factory from '../../users/user.factory';
import * as bcrypt from 'bcrypt';

describe('AuthValidateUserService', () => {
  const userRepositoryMock = {
    findOneBy: jest.fn(),
    save: jest.fn(),
  };
  const repository: Repository<User> = userRepositoryMock as unknown as Repository<User>;
  const service: AuthValidateUserService = new AuthValidateUserService(repository);
  let repositoryUser:Array<User>;
  const user1 = factory.build();
  const user2 = factory.build();

  userRepositoryMock.findOneBy.mockImplementation((params: any): Promise<User> => {
    return new Promise(resolve => {
      const existingUser = repositoryUser.find(user => user.email === params.email);
      resolve(existingUser);
    })
  });

  beforeEach(async () => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash("password", salt);
    user1.passwordHash = hash;
    user2.passwordHash = hash;
    repositoryUser = [];
    repositoryUser.push(user1);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return null for unregistered email', async () => {
    const retUser = await service.call(user2.email, "password2");
    expect(retUser).toBe(null);
    expect(userRepositoryMock.findOneBy).toHaveBeenCalled();
  });

  it('should return null for valid email and wrong password', async () => {
    const retUser = await service.call(user1.email, "lorem ipsum");
    expect(retUser).toBe(null);
    expect(userRepositoryMock.findOneBy).toHaveBeenCalled();
  })

  it('should return a user for valid email and password', async () => {
    const retUser = await service.call(user1.email, "password");
    expect(retUser).toBe(user1);
    expect(userRepositoryMock.findOneBy).toHaveBeenCalled();
  })

});
