import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ChecklistItemModule } from "./checklist-item/checklist-item.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as connectionOptions from "../config/orm.config";

import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ResourcesModule } from "./resources/resources.module";
import { UserPrivilegesModule } from "./user-privileges/user-privileges.module";

@Module({
  imports: [
    ChecklistItemModule,
    TypeOrmModule.forRoot(connectionOptions),
    AuthModule,
    UsersModule,
    ResourcesModule,
    UserPrivilegesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
