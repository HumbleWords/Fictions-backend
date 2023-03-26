import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FandomsModule } from './fandoms/fandoms.module';
import { PrismaService } from './prisma.service';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, FandomsModule, TagsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
