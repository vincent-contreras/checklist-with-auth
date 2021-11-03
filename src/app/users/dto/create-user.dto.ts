import { IsEmail, IsNotEmpty, Max, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  username: string;

  @IsNotEmpty()
  @MaxLength(255)
  fullName: string;

  @IsNotEmpty()
  @MaxLength(255)
  password: string;
}
