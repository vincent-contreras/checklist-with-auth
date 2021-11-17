import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ChecklistItemService } from '../service/checklist-item/checklist-item.service';
import { ChecklistItemDto } from '../dto/checklist-item.dto';
import { ChecklistItem } from '../entity/checklist-item.entity';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Checklist Item')
@Controller('checklist-item')
export class ChecklistItemController {
  constructor(private checklistItemsSvc: ChecklistItemService) {}
  @Post()
  async create(@Body() item: ChecklistItemDto): Promise<ChecklistItem> {
    return await this.checklistItemsSvc.create(item);
  }

  @Get()
  async getAll(): Promise<ChecklistItem[]> {
    return this.checklistItemsSvc.findAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<ChecklistItem> {
    return this.checklistItemsSvc.findOne({ id: id });
  }

  @Patch('/:id')
  async update(
    @Param('id') id: number,
    @Body() item: ChecklistItemDto
  ): Promise<ChecklistItem> {
    return this.checklistItemsSvc.updateOne(id, item);
  }

  @Delete('/:id')
  async deleteOne(
    @Param('id') id
  ): Promise<{ deleted: boolean; message?: string }> {
    return this.checklistItemsSvc.deleteOne(id);
  }
}
