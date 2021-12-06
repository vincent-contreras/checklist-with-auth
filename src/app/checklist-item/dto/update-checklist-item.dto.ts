import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateChecklistItemDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  item: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  checked: boolean;
}
