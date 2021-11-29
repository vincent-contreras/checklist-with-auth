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
import { ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DeleteResponse } from "../../commons/dto/delete-response.dto";

@ApiTags("Checklist Item")
@Controller({ version: "1", path: "checklistItem" })
export class ChecklistItemController {
  constructor(private checklistItemsSvc: ChecklistItemService) {}
  @Post()
  async create(@Body() item: ChecklistItemDto): Promise<ChecklistItem> {
    return await this.checklistItemsSvc.create(item);
  }

  @Get()
  getAll(): Promise<ChecklistItem[]> {
    return this.checklistItemsSvc.findAll();
  }

  @Get("/:id")
  async getOne(@Param("id") id: number): Promise<ChecklistItem> {
    return await this.checklistItemsSvc.findOne({ id: id });
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
  @ApiResponse({ status: 200, type: DeleteResponse, isArray: false })
  async deleteOne(
    @Param("id") id
  ): Promise<{ deleted: boolean; message?: string }> {
    await this.checklistItemsSvc.findOne(+id);
    return this.checklistItemsSvc.deleteOne(+id);
  }
}
