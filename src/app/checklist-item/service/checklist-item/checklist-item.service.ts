import { BadRequestException, Injectable } from "@nestjs/common";
import { ChecklistItemDto } from "../../dto/checklist-item.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ChecklistItem } from "../../entity/checklist-item.entity";
import { Repository } from "typeorm";

@Injectable()
export class ChecklistItemService {
  constructor(
    @InjectRepository(ChecklistItem)
    private readonly checklistRepository: Repository<ChecklistItem>
  ) {}

  async create(item: ChecklistItemDto): Promise<ChecklistItem> {
    const newItem = this.checklistRepository.create(item);
    await this.checklistRepository.save(newItem);
    return newItem;
  }

  findAll(): Promise<ChecklistItem[]> {
    return this.checklistRepository.find();
  }

  async findOne(id): Promise<ChecklistItem> {
    const checklistItem = await this.checklistRepository.findOne(id);

    if (!checklistItem) {
      throw new BadRequestException("Item should exist");
    }

    return checklistItem;
  }

  async updateOne(
    id: number,
    updatedValue: ChecklistItemDto
  ): Promise<ChecklistItem> {
    const item = await this.checklistRepository.findOne(id);

    if (!item) {
      throw new BadRequestException("Item should exist");
    }
    await this.checklistRepository.update({ id }, updatedValue);
    return item;
  }

  async deleteOne(id): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.checklistRepository.delete({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
