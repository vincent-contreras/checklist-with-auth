import { ChecklistItem } from './checklist-item.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistItemController } from '../controller/checklist-item.controller';
import { ChecklistItemService } from '../service/checklist-item/checklist-item.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ChecklistItemEntity', () => {
  it('Item NOT null', () => {
    const checklistItem = new ChecklistItem();
    expect(checklistItem).toBeTruthy();
    expect(checklistItem.item).toBeUndefined();
  });
});
