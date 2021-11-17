import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entity/user.entity';
import { UsersService } from '../service/users.service';

@ApiTags('Users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @ApiResponse({ status: 200, type: User, isArray: false })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: User, isArray: false })
  async getOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: User, isArray: false })
  async updateOne(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    let userResult = await this.usersService.findOneById(id);

    userResult = await this.usersService.update(userResult, updateUserDto);

    return userResult;
  }
}
