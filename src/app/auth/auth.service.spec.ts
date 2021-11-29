import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { UserRepository } from "../users/repositories/user.repository";
import { UsersService } from "../users/services/users.service";
import { AuthService } from "./auth.service";

const resultArray = [];
const expectedResult = new User();

describe("AuthService", () => {
  let service: AuthService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: {
            find: jest.fn().mockResolvedValue(resultArray),
            findOne: jest.fn().mockResolvedValue(expectedResult),
            create: jest.fn().mockResolvedValue(expectedResult),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(null),
            delete: jest.fn().mockResolvedValue(null)
          }
        }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });
});
