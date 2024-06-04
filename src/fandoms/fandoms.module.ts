import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FandomsController } from './fandoms.controller';
import { FandomsService } from './fandoms.service';

@Module({
  controllers: [FandomsController],
  providers: [FandomsService, PrismaService],
})
export class FandomsModule {}
