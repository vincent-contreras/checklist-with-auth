import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Max } from "class-validator";

export class UpdateUserDto {
  @ApiProperty({ required: false, maxLength: 255 })
  @IsEmail()
  username: string;

  @ApiProperty({ required: false, maxLength: 255 })
  @Max(255)
  fullName: string;

  @ApiProperty({ required: false, maxLength: 255 })
  @Max(255)
  password: string;
}
