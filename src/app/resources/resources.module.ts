import { forwardRef, Module } from "@nestjs/common";
import { ResourcesService } from "./resources.service";
import { ResourcesController } from "./resources.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Resource } from "./entities/resource.entity";
import { ResourceRepository } from "./repositories/resource.repository";
import { CaslModule } from "../casl/casl.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Resource, ResourceRepository]),
    forwardRef(() => CaslModule)
  ],
  controllers: [ResourcesController],
  providers: [ResourcesService],
  exports: [ResourcesService]
})
export class ResourcesModule {}
