import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Post,
} from '@nestjs/common';
import { Public } from 'src/common/public.decorator';
import {
  FindAllFandomsDto,
  CreateFandomDto,
  UpdateFandomDto,
} from './fandoms.dto';
import { FandomsService } from './fandoms.service';

@Controller('fandoms')
export class FandomsController {
  constructor(private fandomsService: FandomsService) {}

  @Public()
  @Get()
  async getAll(@Body() params: FindAllFandomsDto) {
    return {
      success: true,
      data: await this.fandomsService.getAll(params),
    };
  }

  @Public()
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.fandomsService.getById(id),
    };
  }

  @Post()
  async create(@Body() data: CreateFandomDto) {
    return {
      success: true,
      data: await this.fandomsService.create(data),
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateFandomDto,
  ) {
    return {
      success: true,
      data: await this.fandomsService.update(id, data),
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.fandomsService.delete(id),
    };
  }
}
