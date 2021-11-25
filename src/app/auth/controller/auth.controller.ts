import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthLoginDto } from "../dto/auth-login.dto";
import { LocalAuthGuard } from "../local.auth.guard";

@ApiTags("Authentication")
@UseInterceptors(ClassSerializerInterceptor)
@Controller({ version: "1", path: "auth" })
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post("login")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Request() req, @Body() loginDto: AuthLoginDto): Promise<any> {
    return req.user;
  }
}
