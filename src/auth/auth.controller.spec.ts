import { User } from "src/users/user.entity"
import { Repository } from "typeorm"
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { JWT_SECRET } from "./secret.key";
import { AuthController } from "./auth.controller";
import factory from "../users/user.factory";
import { AuthRegisterDto } from "./dto/auth.register.dto";
import { BadRequestException } from "@nestjs/common";
import { AuthTokenDto } from "./dto/auth.token.dto";


describe('AuthController', () => {
  const userRepositoryMock = {
    findOneBy: jest.fn(),
    save: jest.fn(),
  };
  const repository: Repository<User> = userRepositoryMock as unknown as Repository<User>;
  const service: AuthService = new AuthService(new JwtService({
    secret: JWT_SECRET,
    signOptions: { expiresIn: '3h' }
  }), repository);
  const controller: AuthController = new AuthController(service);
  let repositoryUser: Array<User> = [];

  userRepositoryMock.findOneBy.mockImplementation((params: any): Promise<User> => {
    return new Promise(resolve => {
      const existingUser = repositoryUser.find(user => user.email === params.email);
      resolve(existingUser);
    })
  });

  userRepositoryMock.save.mockImplementation((params: User): Promise<User> => {
    return new Promise(resolve => {
      repositoryUser.push(params);
      resolve(repositoryUser[repositoryUser.length-1]);
    })
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    beforeEach(async () => {
      jest.clearAllMocks();
      
      // prepare user table
      const user = factory.build();
      repositoryUser = [];
      repositoryUser.push(user);
    });

    it('should throw an error while trying to add an existing user.', async () => {
      const existingUser = repositoryUser[0];
      const {email, firstName, lastName, roles} = existingUser;

      const registerDto: AuthRegisterDto = {email, firstName, lastName, password: "any password", roles};
      expect.assertions(4);
      try{
        await controller.register(registerDto);
      } catch(e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
      
      expect(userRepositoryMock.findOneBy).toHaveBeenCalledTimes(1);
      expect(userRepositoryMock.save).not.toHaveBeenCalled();
      expect(repositoryUser.length).toBe(1);
    });

    it('should add a valid user into database and return token.', async () => {
      const newUser = factory.build();
      const {email, firstName, lastName, roles} = newUser;
      const registerDto: AuthRegisterDto = {email, firstName, lastName, password: "secure password", roles};
      let returnData: any;

      expect.assertions(5);
      try{
        returnData = await controller.register(registerDto);
      } catch(e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
      
      expect(userRepositoryMock.findOneBy).toHaveBeenCalledTimes(1);
      expect(userRepositoryMock.save).toHaveBeenCalled();
      expect(repositoryUser.length).toBe(2);
      expect(returnData).toBeInstanceOf(AuthTokenDto);
      expect(returnData.token).not.toBe("");
    })

  });

  describe("login", () => {
    beforeEach(async () => {
      jest.clearAllMocks();
    })

    it('should return a token.', async () => {
      const user2 = factory.build();
      const request = {user: user2};
      let tokenDto: any;
      try{
        tokenDto = await controller.login(null, request);
      } catch(e) {
      }

      expect(tokenDto).toBeInstanceOf(AuthTokenDto);
    });

  });

});