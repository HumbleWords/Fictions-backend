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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger/dist/decorators';
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

@ApiTags('Работы')
@Controller('works')
export class WorksController {
  constructor(private worksService: WorksService) {}

  @Public()
  @ApiOperation({
    summary: 'Получить список опубликованных работ',
  })
  @Get()
  async getAll(@Query() params: FindAllWorksDto) {
    let orderParam = {};
    if (params.orderParam === 'title') orderParam = { title: params.orderBy };
    if (params.orderParam === 'createdAt')
      orderParam = { createdAt: params.orderBy };
    if (params.orderParam === 'updatedAt')
      orderParam = { updatedAt: params.orderBy };

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

    return await this.worksService.getAll(processedParams, params.search);
  }

  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: 'Создать новую работу',
  })
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
  @ApiOperation({
    summary: 'Получить список моих работ',
  })
  @Get('myworks')
  async getMyWorks(@Request() req, @Query() params: FindMyWorksDto) {
    let orderParam = {};
    if (params.orderParam === 'title') orderParam = { title: params.orderBy };
    if (params.orderParam === 'createdAt')
      orderParam = { createdAt: params.orderBy };
    if (params.orderParam === 'updatedAt')
      orderParam = { updatedAt: params.orderBy };

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
      orderBy: orderParam,
    };

    return await this.worksService.getMyWorks(
      processedParams,
      req.user.id,
      params.search,
    );
  }

  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: 'Получить мою работу по id',
  })
  @Get('myworks/:id')
  async getMyWorkById(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return await this.worksService.getMyWorkById(id, req.user.id);
  }

  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: 'Получить мои избранные работы',
  })
  @Get('favorites')
  async getFavoriteWorks(@Request() req, @Query() params: FindAllWorksDto) {
    let orderParam = {};
    if (params.orderParam === 'title') orderParam = { title: params.orderBy };
    if (params.orderParam === 'createdAt')
      orderParam = { createdAt: params.orderBy };
    if (params.orderParam === 'updatedAt')
      orderParam = { updatedAt: params.orderBy };

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

    return await this.worksService.getFavoriteWorks(
      processedParams,
      req.user.id,
      params.search,
    );
  }

  @Public()
  @ApiOperation({
    summary: 'Получить работу по id',
  })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.worksService.getById(id);
  }

  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: 'Добавить работу в избранное',
  })
  @Put(':id/addtofavorites')
  async addToFavorite(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return await this.worksService.addToFavorites(id, req.user.id);
  }

  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: 'Удалить работу из избранного',
  })
  @Put(':id/removefromfavorites')
  async removeFromFavorite(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.worksService.removeFromFavorites(id, req.user.id);
  }

  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: 'Обновить информацию о работе',
  })
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
  @ApiOperation({
    summary: 'Удалить работу',
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return await this.worksService.delete(id, req.user.id);
  }
}
