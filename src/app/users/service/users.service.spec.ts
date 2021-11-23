import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";
import { UserRepository } from "../repository/user.repository";
import { UsersService } from "../service/users.service";
import { loremIpsum } from "lorem-ipsum";
import * as randomEmail from "random-email";

const expectedResult = new User();
expectedResult.createdAt = new Date();
expectedResult.id = 1;
expectedResult.fullName = loremIpsum({ count: 2, units: "words" });
expectedResult.username = randomEmail();
expectedResult.password = "Hello world";

const resultArray = [];

describe("UsersService", () => {
  let service: UsersService;
  let repo: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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

    service = module.get<UsersService>(UsersService);
    repo = module.get<UserRepository>(UserRepository);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
