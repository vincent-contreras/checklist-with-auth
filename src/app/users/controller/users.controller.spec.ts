import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "../services/users.service";
import { UsersController } from "./users.controller";

jest.mock("../service/users.service");

describe("UsersController", () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService]
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
