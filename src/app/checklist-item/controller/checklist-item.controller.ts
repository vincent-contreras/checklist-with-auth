import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from "@nestjs/common";
import { ChecklistItemService } from "../services/checklist-item.service";
import { ChecklistItemDto } from "../dto/checklist-item.dto";
import { ChecklistItem } from "../entities/checklist-item.entity";
import { ApiParam, ApiTags } from "@nestjs/swagger";

@ApiTags("Checklist Item")
@Controller({ version: "1", path: "checklistItem" })
export class ChecklistItemController {
  constructor(private checklistItemsSvc: ChecklistItemService) {}
  @Post()
  create(@Body() item: ChecklistItemDto): Promise<ChecklistItem> {
    return this.checklistItemsSvc.create(item);
  }

  @Get()
  getAll(): Promise<ChecklistItem[]> {
    return this.checklistItemsSvc.findAll();
  }

  @Get("/:id")
  getOne(@Param("id") id: number): Promise<ChecklistItem> {
    return this.checklistItemsSvc.findOne({ id: id });
  }

  @Patch("/:id")
  update(
    @Param("id") id: number,
    @Body() item: ChecklistItemDto
  ): Promise<ChecklistItem> {
    return this.checklistItemsSvc.updateOne(id, item);
  }

  @Delete("/:id")
  @ApiParam({ name: "id" })
  async deleteOne(
    @Param("id") id
  ): Promise<{ deleted: boolean; message?: string }> {
    await this.checklistItemsSvc.findOne(+id);
    return this.checklistItemsSvc.deleteOne(+id);
  }
}
