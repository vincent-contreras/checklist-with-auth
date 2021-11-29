import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { Action } from '../../auth/enum/action.enum';
import { AuthorizationGuard } from '../../casl/authorization.guard';
import { AppAbility } from '../../casl/casl-ability.factory';
import { CheckPolicies } from '../../casl/check-policies.decorator';
import { DeleteResponse } from '../../commons/dto/delete-response.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@ApiTags('Users')
@Controller({ version: '1', path: 'users' })
@ApiCookieAuth('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthorizationGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('')
  @ApiOperation({ summary: 'Create new user', description: 'User signup' })
  @ApiResponse({ status: 200, type: User, isArray: false })
  @CheckPolicies((ability: AppAbility) => ability.can(Action.CREATE, 'USERS'))
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one user by ID',
    description: 'Gets one user object by providing ID'
  })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, type: User, isArray: false })
  @CheckPolicies((ability: AppAbility) => ability.can(Action.READ, 'USERS'))
  async getOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update one user by ID',
    description: 'Updates one user by providing user ID and the new details'
  })
  @ApiResponse({ status: 200, type: User, isArray: false })
  @CheckPolicies((ability: AppAbility) => ability.can(Action.UPDATE, 'USERS'))
  async updateOne(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    let userResult = await this.usersService.findOneById(id);

    userResult = await this.usersService.update(userResult, updateUserDto);

    return userResult;
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete one user by ID',
    description: 'Deletes one user object by providing ID'
  })
  @ApiResponse({ status: 200, type: DeleteResponse, isArray: false })
  @CheckPolicies((ability: AppAbility) => ability.can(Action.DELETE, 'USERS'))
  async deleteOne(
    @Param('id') id
  ): Promise<{ deleted: boolean; message?: string }> {
    return await this.usersService.deleteOne(id);
  }
}
