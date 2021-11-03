import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChecklistItemModule } from './checklist-item/checklist-item.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as connectionOptions from '../config/orm.config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ChecklistItemModule,
    TypeOrmModule.forRoot(connectionOptions),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
