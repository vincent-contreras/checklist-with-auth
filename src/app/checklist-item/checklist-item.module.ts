import { Module } from '@nestjs/common';
import { ChecklistItemController } from './controller/checklist-item.controller';
import { ChecklistItemService } from './services/checklist-item.service';
import { ChecklistItem } from './entities/checklist-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ChecklistItem])],

  controllers: [ChecklistItemController],

  providers: [ChecklistItemService]
})
export class ChecklistItemModule {}
