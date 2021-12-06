import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateChecklistItemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  item: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  checked: boolean;
}
