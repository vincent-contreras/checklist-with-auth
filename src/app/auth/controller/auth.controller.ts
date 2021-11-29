import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../../users/dto/create-user.dto";
import { User } from "../../users/entities/user.entity";
import { UsersService } from "../../users/services/users.service";
import { AuthLoginDto } from "../dto/auth-login.dto";
import { LocalAuthGuard } from "../local.auth.guard";

@ApiTags("Authentication")
@UseInterceptors(ClassSerializerInterceptor)
@Controller({ version: "1", path: "auth" })
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @ApiResponse({ status: 200, type: User })
  @ApiOperation({
    summary: "Do user login",
    description: "Do user login by providing a username and password."
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Request() req, @Body() loginDto: AuthLoginDto): Promise<any> {
    return req.user;
  }

  @Post("signup")
  @ApiOperation({ summary: "Create new user", description: "User signup" })
  @ApiResponse({ status: 200, type: User, isArray: false })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get("")
  @ApiOperation({
    summary: "Get currently logged in user",
    description: "Retrieves currently logged in user"
  })
  @ApiResponse({ status: 200, type: User })
  async getCurrentUser(@Req() req): Promise<User> {
    const currentUserId = req.user.id;

    return await this.usersService.findOneById(currentUserId);
  }
}
