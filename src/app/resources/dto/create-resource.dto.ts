import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateResourceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  koreanName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  creatable: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  readable: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  updatable: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  deletable: boolean;
}
