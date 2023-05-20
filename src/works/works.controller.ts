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
  Query,
} from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist/decorators';
import { Public } from 'src/common/public.decorator';
import {
  CreateWorkDto,
  CreateWorkProcessedDto,
  FindAllWorksDto,
  FindAllWorksProcessedDto,
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
  @Get()
  async getAll(@Query() params: FindAllWorksDto) {
    const processedParams: FindAllWorksProcessedDto = {
      skip: params.skip,
      take: params.take,
      where: {
        title: params.title ? params.title : undefined,
        author: params.author
          ? {
              username: params.author,
            }
          : undefined,
        tags: params.tags
          ? {
              some: {
                name: params.tags,
              },
            }
          : undefined,
        fandoms: params.fandoms
          ? {
              some: {
                name: params.fandoms,
              },
            }
          : undefined,
      },
      orderBy: {
        title: params.orderBy,
      },
    };

    return await this.worksService.getAll(processedParams);
  }

  @Post()
  async create(@Request() req, @Body() data: CreateWorkDto) {
    const processedParams: CreateWorkProcessedDto = {
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
    return await this.worksService.create({
      author: { connect: { id: req.user.id } },
      ...processedParams,
    });
  }

  @Get('myworks')
  async getMyWorks(@Request() req, @Query() params: FindAllWorksDto) {
    const processedParams: FindAllWorksProcessedDto = {
      skip: params.skip,
      take: params.take,
      where: {
        title: params.title,
        author: {
          username: params.author,
        },
        tags: {
          some: {
            name: params.tags,
          },
        },
        fandoms: {
          some: {
            name: params.fandoms,
          },
        },
      },
      orderBy: {
        title: params.orderBy,
      },
    };
    return await this.worksService.getMyWorks(processedParams, req.user.id);
  }

  @Public()
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.worksService.getById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
    @Body() data: UpdateWorkDto,
  ) {
    const processedParams: UpdateWorkProcessedDto = {
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
    return await this.worksService.update(id, processedParams, req.user.id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return await this.worksService.delete(id, req.user.id);
  }
}
