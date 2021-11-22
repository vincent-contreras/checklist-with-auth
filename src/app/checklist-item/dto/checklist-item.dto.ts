import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class ChecklistItemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3)
  item: string;

  constructor(item: string) {
    this.item = item;
  }
}
