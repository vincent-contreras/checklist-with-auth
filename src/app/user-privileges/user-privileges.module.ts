import { Module } from "@nestjs/common";
import { UserPrivilegesService } from "./user-privileges.service";
import { UserPrivilegesController } from "./user-privileges.controller";
import { UserPrivilege } from "./entities/user-privilege.entity";
import { UserPrivilegeRepository } from "./repositories/user-privilege.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "../users/users.module";
import { ResourcesModule } from "../resources/resources.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserPrivilege, UserPrivilegeRepository]),
    UsersModule,
    ResourcesModule
  ],
  controllers: [UserPrivilegesController],
  providers: [UserPrivilegesService],
  exports: [UserPrivilegesService]
})
export class UserPrivilegesModule {}
