import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOneById(id: number): Promise<User> {
    const userResult = await this.userRepository.findOne(id);
    if (!userResult) {
      throw new BadRequestException(`User ID ${id} cannot be found`);
    }
    return userResult;
  }

  async findOneByUsername(username: string) {
    const userResult = await this.userRepository.findOne({
      username: username
    });

    return userResult;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const duplicateUser = await this.findOneByUsername(createUserDto.username);

    if (duplicateUser) {
      throw new BadRequestException(
        `User ${createUserDto.username} already exists`
      );
    }
    const newItem = this.userRepository.create(createUserDto);
    await this.userRepository.save(newItem);
    return newItem;
  }

  async update(user: User, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(+user.id, updateUserDto);

    return await this.findOneById(+user.id);
  }

  async deleteOne(id): Promise<{ deleted: boolean; message?: string }> {
    await this.findOneById(id);

    try {
      await this.userRepository.delete({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
