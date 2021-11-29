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
    const user = await this.userService.findOneById(
      createUserPrivilegeDto.userId
    );
    const resource = await this.resourceService.findOneById(
      createUserPrivilegeDto.resourceId
    );

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
  }

  async findAll() {
    return await this.userPrivilegeRepository.find();
  }

  async findOneById(id: number) {
    const privilege = await this.userPrivilegeRepository.findOne({ id: id });

    if (!privilege) {
      throw new BadRequestException(`Privilege ID ${id} does not exist`);
    }

    return privilege;
  }

  async update(id: number, updateUserPrivilegeDto: UpdateUserPrivilegeDto) {
    await this.findOneById(id);

    await this.userPrivilegeRepository.update({ id }, updateUserPrivilegeDto);

    return this.findOneById(id);
  }

  async deleteOne(id: number) {
    await this.findOneById(id);
    try {
      await this.userPrivilegeRepository.delete({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
