import AuthRegisterService from './auth.register.service';
import { Repository } from 'typeorm';
import { User } from '../../users/user.entity';
import factory from '../../users/user.factory';

describe('AuthRegisterService', () => {
  const userRepositoryMock = {
    findOneBy: jest.fn(),
    save: jest.fn(),
  };
  const repository: Repository<User> = userRepositoryMock as unknown as Repository<User>;
  const service = new AuthRegisterService(repository);
  let userRepository: Array<User> = [];
  const testRepositorySize = 5;

  userRepositoryMock.findOneBy.mockImplementation((params: any): Promise<User> => {
    return new Promise(resolve => {
      const existingUser = userRepository.find(user => user.email === params.email);
      resolve(existingUser);
    })
  });

  userRepositoryMock.save.mockImplementation((params: User): Promise<User> => {
    return new Promise(resolve => {
      userRepository.push(params);
      resolve(userRepository[userRepository.length-1]);
    })
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('call', () => {
    beforeEach(async () => {
      userRepository = [];
      for(let i=0; i<testRepositorySize; i++) {
        userRepository.push(factory.build());
      }
      jest.clearAllMocks();
    })

    it('should add a new user into users repository.', async () => {
      const user = factory.build();
      const authRegisterDto = {email: user.email, firstName: user.firstName, 
      lastName: user.lastName, password: "password", roles: []};

      const newUser = await service.call(authRegisterDto);
      expect(userRepositoryMock.findOneBy).toHaveBeenCalled();
      expect(userRepositoryMock.save).toHaveBeenCalled();
      expect(userRepository.length).toBe(testRepositorySize + 1);
      expect(newUser.passwordHash).not.toBe('');
    })

    it('should thrown an error while trying to register same email.', async () => {
      const user = factory.build();
      user.email = userRepository[0].email;

      const authRegisterDto = {email: user.email, firstName: user.firstName, lastName: user.lastName, password: "password", roles: []};
      service.call(authRegisterDto).catch(e => {
        expect(e.message).toMatch(/already/);
      })
      
      expect(userRepositoryMock.findOneBy).toHaveBeenCalled();
      expect(userRepositoryMock.save).not.toHaveBeenCalled();
    });

  });  
});
