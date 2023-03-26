import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  FindAllFandomsDto,
  CreateFandomDto,
  UpdateFandomDto,
} from './fandoms.dto';
import { FandomsService } from './fandoms.service';

@Controller('fandoms')
export class FandomsController {
  constructor(private fandomsService: FandomsService) {}

  @Get()
  async getAll(@Body() params: FindAllFandomsDto) {
    return await this.fandomsService.getAll(params);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.fandomsService.getById(id);
  }

  @Post()
  async create(@Body() data: CreateFandomDto) {
    return await this.fandomsService.create(data);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateFandomDto,
  ) {
    return await this.fandomsService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.fandomsService.delete(id);
  }
}
