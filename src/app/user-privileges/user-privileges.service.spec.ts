import { Test, TestingModule } from '@nestjs/testing';
import { UserPrivilegesService } from './user-privileges.service';

describe('UserPrivilegesService', () => {
  let service: UserPrivilegesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPrivilegesService]
    }).compile();

    service = module.get<UserPrivilegesService>(UserPrivilegesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
