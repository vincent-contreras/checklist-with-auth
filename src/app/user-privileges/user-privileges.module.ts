import { Module } from "@nestjs/common";
import { UserPrivilegesService } from "./user-privileges.service";
import { UserPrivilegesController } from "./user-privileges.controller";

@Module({
  controllers: [UserPrivilegesController],
  providers: [UserPrivilegesService]
})
export class UserPrivilegesModule {}
