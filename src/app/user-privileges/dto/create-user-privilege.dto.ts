import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserPrivilegeDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  resourceId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  canCreate: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  canRead: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  canUpdate: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  canDelete: boolean;
}
