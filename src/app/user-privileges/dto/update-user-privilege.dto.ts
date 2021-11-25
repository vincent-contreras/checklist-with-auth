import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { CreateUserPrivilegeDto } from "./create-user-privilege.dto";

export class UpdateUserPrivilegeDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  resourceId: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  canCreate: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  canRead: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  canUpdate: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  canDelete: boolean;
}
