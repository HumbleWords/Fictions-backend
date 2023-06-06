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
  FindMyWorksDto,
  FindMyWorksProcessedDto,
  UpdateWorkDto,
  UpdateWorkProcessedDto,
} from './works.dto';
import { WorksService } from './works.service';

@ApiTags('Works')
@Controller('works')
export class WorksController {
  constructor(private worksService: WorksService) {}

  @Public()
  @Get()
  async getAll(@Query() params: FindAllWorksDto) {
    let orderParam = {};
    switch (params.orderParam) {
      case 'title':
        orderParam = { title: params.orderBy };
      case 'createdAt':
        orderParam = { createdAt: params.orderBy };
      case 'updatedAt':
        orderParam = { updatedAt: params.orderBy };
      default:
        orderParam = { createdAt: params.orderBy };
    }
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
        tags: {
          some: {
            name: {
              contains: params.tags,
              mode: 'insensitive',
            },
          },
        },
        fandoms: {
          some: {
            name: {
              contains: params.fandoms,
              mode: 'insensitive',
            },
          },
        },
      },
      orderBy: orderParam,
    };

    return await this.worksService.getAll(processedParams);
  }

  @ApiBearerAuth('access_token')
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

  @ApiBearerAuth('access_token')
  @Get('myworks')
  async getMyWorks(@Request() req, @Query() params: FindMyWorksDto) {
    const processedParams: FindMyWorksProcessedDto = {
      skip: params.skip,
      take: params.take,
      where: {
        title: params.title,
        tags: {
          some: {
            name: {
              contains: params.tags,
              mode: 'insensitive',
            },
          },
        },
        fandoms: {
          some: {
            name: {
              contains: params.fandoms,
              mode: 'insensitive',
            },
          },
        },
      },
      orderBy: {
        title: params.orderBy,
      },
    };
    return await this.worksService.getMyWorks(processedParams, req.user.id);
  }

  @ApiBearerAuth('access_token')
  @Get('myworks/:id')
  async getMyWorkById(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return await this.worksService.getMyWorkById(id, req.user.id);
  }

  @Public()
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.worksService.getById(id);
  }

  @ApiBearerAuth('access_token')
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

  @ApiBearerAuth('access_token')
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return await this.worksService.delete(id, req.user.id);
  }
}
