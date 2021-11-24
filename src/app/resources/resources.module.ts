import { Module } from "@nestjs/common";
import { ResourcesService } from "./resources.service";
import { ResourcesController } from "./resources.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Resource } from "./entities/resource.entity";
import { ResourceRepository } from "./repositories/resource.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Resource, ResourceRepository])],
  controllers: [ResourcesController],
  providers: [ResourcesService]
})
export class ResourcesModule {}
