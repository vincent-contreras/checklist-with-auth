import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/services/users.service";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByUsername(username);

    if (!(await user?.validatePassword(password))) {
      throw new UnauthorizedException("Invalid password.");
    }

    if (!user.activatedAt) {
      throw new UnauthorizedException("User is currently not activated.");
    }

    return user;
  }
}
