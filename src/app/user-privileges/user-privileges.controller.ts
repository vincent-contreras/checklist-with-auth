import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { UserPrivilegesService } from './user-privileges.service';
import { CreateUserPrivilegeDto } from './dto/create-user-privilege.dto';
import { UpdateUserPrivilegeDto } from './dto/update-user-privilege.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserPrivilege } from './entities/user-privilege.entity';
import { DeleteResponse } from '../commons/dto/delete-response.dto';

@ApiTags('User Privileges')
@Controller({ version: '1', path: 'user-privileges' })
export class UserPrivilegesController {
  constructor(private readonly userPrivilegesService: UserPrivilegesService) {}

  @Post()
  @ApiBody({ type: CreateUserPrivilegeDto, isArray: true })
  @ApiOperation({ summary: 'Create new privilege', description: 'User signup' })
  @ApiResponse({ status: 200, type: UserPrivilege, isArray: true })
  async create(@Body() createUserPrivilegeDtos: CreateUserPrivilegeDto[]) {
    const result = [];
    for (const createUserPrivilegeDto of createUserPrivilegeDtos) {
      result.push(
        await this.userPrivilegesService.create(createUserPrivilegeDto)
      );
    }
    return result;
  }

  @Get()
  @ApiBody({ type: CreateUserPrivilegeDto, isArray: true })
  @ApiOperation({
    summary: 'Get list of privileges',
    description: 'Returns a list of privileges'
  })
  @ApiResponse({ status: 200, type: UserPrivilege, isArray: false })
  findAll() {
    return this.userPrivilegesService.findAll();
  }

  @Get(':id')
  @ApiBody({ type: CreateUserPrivilegeDto, isArray: true })
  @ApiOperation({
    summary: 'Get one privilege',
    description: 'Returns one privilege'
  })
  @ApiResponse({ status: 200, type: UserPrivilege, isArray: false })
  findOne(@Param('id') id: string) {
    return this.userPrivilegesService.findOneById(+id);
  }

  @Patch(':id')
  @ApiBody({ type: CreateUserPrivilegeDto, isArray: false })
  @ApiOperation({
    summary: 'Update user privilege',
    description: 'Update user privilege'
  })
  @ApiResponse({ status: 200, type: UserPrivilege, isArray: true })
  update(
    @Param('id') id: string,
    @Body() updateUserPrivilegeDto: UpdateUserPrivilegeDto
  ) {
    return this.userPrivilegesService.update(+id, updateUserPrivilegeDto);
  }

  @Delete(':id')
  @ApiBody({ type: CreateUserPrivilegeDto, isArray: true })
  @ApiOperation({
    summary: 'Delete user privilege',
    description: 'Deletes one user privilege'
  })
  @ApiResponse({ status: 200, type: DeleteResponse, isArray: false })
  remove(@Param('id') id: string) {
    return this.userPrivilegesService.deleteOne(+id);
  }
}
