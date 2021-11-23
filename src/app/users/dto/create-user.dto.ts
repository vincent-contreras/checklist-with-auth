import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: "Email address of user",
    required: true,
    maxLength: 255
  })
  @IsEmail()
  username: string;

  @ApiProperty({ required: true, maxLength: 255 })
  @IsNotEmpty()
  @MaxLength(255)
  fullName: string;

  @ApiProperty({ required: true, maxLength: 255 })
  @IsNotEmpty()
  @MaxLength(255)
  password: string;
}
