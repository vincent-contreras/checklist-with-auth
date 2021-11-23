import { Test, TestingModule } from '@nestjs/testing';
import { UserPrivilegesController } from './user-privileges.controller';
import { UserPrivilegesService } from './user-privileges.service';

describe('UserPrivilegesController', () => {
  let controller: UserPrivilegesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPrivilegesController],
      providers: [UserPrivilegesService],
    }).compile();

    controller = module.get<UserPrivilegesController>(UserPrivilegesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
