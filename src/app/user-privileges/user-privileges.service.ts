import { BadRequestException, Injectable } from '@nestjs/common';
import { ResourcesService } from '../resources/resources.service';
import { UsersService } from '../users/services/users.service';
import { CreateUserPrivilegeDto } from './dto/create-user-privilege.dto';
import { UpdateUserPrivilegeDto } from './dto/update-user-privilege.dto';
import { UserPrivilegeRepository } from './repositories/user-privilege.repository';

@Injectable()
export class UserPrivilegesService {
  constructor(
    private readonly userPrivilegeRepository: UserPrivilegeRepository,
    private readonly userService: UsersService,
    private readonly resourceService: ResourcesService
  ) {}
  async create(createUserPrivilegeDto: CreateUserPrivilegeDto) {
    const user = await this.userService.findOneById(createUserPrivilegeDto.userId);
    const resource = await this.resourceService.findOneById(createUserPrivilegeDto.resourceId);

    const duplicateEntry = await this.userPrivilegeRepository.findOne({
      userId: user.id,
      resourceId: resource.id
    });

    if (duplicateEntry) {
      throw new BadRequestException('Privilege already exists');
    }

    const newPrivilege = this.userPrivilegeRepository.create(
      createUserPrivilegeDto
    );
    await this.userPrivilegeRepository.save(newPrivilege);

    return newPrivilege;

    /*
    const duplicateUser = await this.findOneByUsername(createUserDto.username);

    if (duplicateUser) {
      throw new BadRequestException(
        `User ${createUserDto.username} already exists`
      );
    }
    const newItem = this.userRepository.create(createUserDto);
    await this.userRepository.save(newItem);
    return newItem;
    */
  }

  findAll() {
    return `This action returns all userPrivileges`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userPrivilege`;
  }

  update(id: number, updateUserPrivilegeDto: UpdateUserPrivilegeDto) {
    return `This action updates a #${id} userPrivilege`;
  }

  remove(id: number) {
    return `This action removes a #${id} userPrivilege`;
  }
}
