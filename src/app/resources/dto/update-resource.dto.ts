import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString, MaxLength } from "class-validator";

export class UpdateResourceDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  koreanName: string;

  @ApiProperty()
  @IsBoolean()
  creatable: boolean;

  @ApiProperty()
  @IsBoolean()
  readable: boolean;

  @ApiProperty()
  @IsBoolean()
  updatable: boolean;

  @ApiProperty()
  @IsBoolean()
  deletable: boolean;
}
