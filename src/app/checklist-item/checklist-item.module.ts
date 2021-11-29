import { forwardRef, Module } from "@nestjs/common";
import { ChecklistItemController } from "./controller/checklist-item.controller";
import { ChecklistItemService } from "./services/checklist-item.service";
import { ChecklistItem } from "./entities/checklist-item.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CaslModule } from "../casl/casl.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ChecklistItem]),
    forwardRef(() => CaslModule)
  ],

  controllers: [ChecklistItemController],

  providers: [ChecklistItemService]
})
export class ChecklistItemModule {}
