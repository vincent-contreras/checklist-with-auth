import { Resource } from "../resources/entities/resource.entity";
import { User } from "../users/entities/user.entity";
import { CaslAbilityFactory } from "./casl-ability.factory";
import { TypeOrmModule } from "@nestjs/typeorm";
import { forwardRef, Module } from "@nestjs/common";
import { ResourcesModule } from "../resources/resources.module";

@Module({
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
  imports: [
    TypeOrmModule.forFeature([Resource, User]),
    forwardRef(() => ResourcesModule)
  ]
})
export class CaslModule {}
