import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { ChecklistItemService } from '../services/checklist-item.service';
import { NewChecklistItemDto } from '../dto/new-checklist-item.dto';
import { ChecklistItem } from '../entities/checklist-item.entity';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { DeleteResponse } from '../../commons/dto/delete-response.dto';
import { AppAbility } from '../../casl/casl-ability.factory';
import { Action } from '../../auth/enum/action.enum';
import { UpdateChecklistItemDto } from '../dto/update-checklist-item.dto';

@ApiTags('Checklist Item')
@Controller({ version: '1', path: 'checklist-item' })
export class ChecklistItemController {
  constructor(private checklistItemsSvc: ChecklistItemService) {}

  @Post()
  @ApiOperation({
    summary: 'Create new item',
    description: 'Creates a new item.'
  })
  @ApiResponse({ status: 200, type: ChecklistItem, isArray: false })
  async create(@Body() item: NewChecklistItemDto): Promise<ChecklistItem> {
    return await this.checklistItemsSvc.create(item);
  }

  @Get()
  @ApiOperation({
    summary: 'Get list of items',
    description: 'Retrieves list of items'
  })
  @ApiResponse({ status: 200, type: ChecklistItem, isArray: true })
  getAll(): Promise<ChecklistItem[]> {
    return this.checklistItemsSvc.findAll();
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get one item',
    description: 'Retrieves one item by ID'
  })
  @ApiParam({ name: 'id', description: 'Unique ID of checklist item' })
  @ApiResponse({ status: 200, type: ChecklistItem, isArray: false })
  async getOne(@Param('id') id: number): Promise<ChecklistItem> {
    return await this.checklistItemsSvc.findOne({ id: id });
  }

  @Patch('/:id')
  @ApiCookieAuth('checklist-item')
  @ApiOperation({
    summary: 'Update one item',
    description: 'Updates one item by ID'
  })
  @ApiParam({ name: 'id', description: 'Unique ID of checklist item' })
  @ApiResponse({ status: 200, type: ChecklistItem, isArray: false })
  update(
    @Param('id') id: number,
    @Body() item: UpdateChecklistItemDto
  ): Promise<ChecklistItem> {
    return this.checklistItemsSvc.updateOne(id, item);
  }

  @Delete('/:id')
  @ApiCookieAuth('checklist-item')
  @ApiParam({ name: 'id', description: 'Unique ID of checklist item' })
  @ApiResponse({ status: 200, type: DeleteResponse, isArray: false })
  @ApiOperation({
    summary: 'Delete one item',
    description: 'Deletes one item by ID.'
  })
  async deleteOne(
    @Param('id') id
  ): Promise<{ deleted: boolean; message?: string }> {
    await this.checklistItemsSvc.findOne(+id);
    return this.checklistItemsSvc.deleteOne(+id);
  }
}
