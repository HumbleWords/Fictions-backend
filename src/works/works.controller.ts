import { ParseIntPipe } from '@nestjs/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Request,
} from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist/decorators';
import { Public } from 'src/common/public.decorator';
import {
  CreateWorkDto,
  CreateWorkProcessedDto,
  FindAllWorksDto,
  UpdateWorkDto,
  UpdateWorkProcessedDto,
} from './works.dto';
import { WorksService } from './works.service';

@ApiBearerAuth('access_token')
@ApiTags('Works')
@Controller('works')
export class WorksController {
  constructor(private worksService: WorksService) {}

  @Public()
  @Post()
  async getAll(@Body() params: FindAllWorksDto) {
    return {
      success: true,
      data: await this.worksService.getAll(params),
    };
  }

  @Get('myworks')
  async getMyWorks(@Request() req, @Body() params: FindAllWorksDto) {
    return {
      success: true,
      data: await this.worksService.getMyWorks(params, req.user.id),
    };
  }

  @Public()
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.worksService.getById(id),
    };
  }

  @Post('new')
  async create(@Request() req, @Body() data: CreateWorkDto) {
    const processedData: CreateWorkProcessedDto = {
      title: data.title,
      description: data.description,
      note: data.note,
      status: data.status,
      lang: data.lang,
      rating: data.rating,
      category: data.category,
      tags: {
        connect: data.tags,
      },
      fandoms: {
        connect: data.fandoms,
      },
    };
    return {
      success: true,
      data: await this.worksService.create({
        author: { connect: { id: req.user.id } },
        ...processedData,
      }),
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
    @Body() data: UpdateWorkDto,
  ) {
    const processedData: UpdateWorkProcessedDto = {
      title: data.title,
      description: data.description,
      note: data.note,
      status: data.status,
      lang: data.lang,
      rating: data.rating,
      category: data.category,
      tags: {
        connect: data.tags,
      },
      fandoms: {
        connect: data.fandoms,
      },
    };
    return {
      success: true,
      data: await this.worksService.update(id, processedData, req.user.id),
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return {
      success: true,
      data: await this.worksService.delete(id, req.user.id),
    };
  }
}
