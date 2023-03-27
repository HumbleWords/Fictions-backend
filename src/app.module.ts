import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { JwtAuthGuard } from './common/jwt-auth.guard';
import { RolesGuard } from './common/roles.guard';
import { FandomsModule } from './fandoms/fandoms.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
import { WorkPartsModule } from './workparts/workparts.module';
import { WorksModule } from './works/works.module';

@Module({
  imports: [
    CommentsModule,
    FandomsModule,
    TagsModule,
    UsersModule,
    WorkPartsModule,
    WorksModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
