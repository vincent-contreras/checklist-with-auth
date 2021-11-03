import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class ChecklistItemDto {
  @IsString()
  @IsNotEmpty()
  @Length(3)
  item: string;

  constructor(item: string) {
    this.item = item;
  }
}
