import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { WorksController } from './works.controller';
import { WorksService } from './works.service';

@Module({
  controllers: [WorksController],
  providers: [WorksService, PrismaService],
})
export class WorksModule {}
