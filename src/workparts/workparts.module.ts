import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { WorkPartsController } from './workparts.controller';
import { WorkPartsService } from './workparts.service';

@Module({
  controllers: [WorkPartsController],
  providers: [WorkPartsService, PrismaService],
})
export class WorkPartsModule {}
