import { IsEmail, Max } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  username: string;

  @Max(255)
  fullName: string;

  @Max(255)
  password: string;
}
