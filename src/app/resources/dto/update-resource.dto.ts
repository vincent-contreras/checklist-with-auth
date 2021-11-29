import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateResourceDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @IsOptional()
  koreanName: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  creatable: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  readable: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  updatable: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  deletable: boolean;
}
