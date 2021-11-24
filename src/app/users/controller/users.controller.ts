import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors
} from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";
import { UsersService } from "../services/users.service";

@ApiTags("Users")
@Controller({ version: "1", path: "users" })
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("signup")
  @ApiOperation({ summary: "Create new user", description: "User signup" })
  @ApiResponse({ status: 200, type: User, isArray: false })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get one user by ID",
    description: "Gets one user object by providing ID"
  })
  @ApiParam({ name: "id", description: "User ID" })
  @ApiResponse({ status: 200, type: User, isArray: false })
  async getOne(@Param("id") id: number): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update one user by ID",
    description: "Updates one user by providing user ID and the new details"
  })
  @ApiResponse({ status: 200, type: User, isArray: false })
  async updateOne(
    @Param("id") id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    let userResult = await this.usersService.findOneById(id);

    userResult = await this.usersService.update(userResult, updateUserDto);

    return userResult;
  }

  @Delete("/:id")
  @ApiOperation({
    summary: "Delete one user by ID",
    description: "Deletes one user object by providing ID"
  })
  async deleteOne(
    @Param("id") id
  ): Promise<{ deleted: boolean; message?: string }> {
    return await this.usersService.deleteOne(id);
  }
}
