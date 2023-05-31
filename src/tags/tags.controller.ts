import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger/dist/decorators';
import { Public } from 'src/common/public.decorator';
import {
  CreateTagDto,
  FindAllTagsDto,
  FindAllTagsProcessedDto,
  UpdateTagDto,
} from './tags.dto';
import { TagsService } from './tags.service';
import { Roles } from 'src/common/role.decorator';
import { Role } from 'src/common/role.enum';

@ApiTags('Теги')
@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Public()
  @ApiOperation({
    summary: 'Получить список тегов',
  })
  @Get()
  async getAll(@Query() params: FindAllTagsDto) {
    const processedParams: FindAllTagsProcessedDto = {
      skip: params.skip,
      take: params.take,
      orderBy: { name: params.orderBy },
      where: {
        name: {
          contains: params.where,
          mode: 'insensitive',
        },
      },
    };
    return await this.tagsService.getAll(processedParams);
  }

  @ApiBearerAuth('access_token')
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Создать тег',
  })
  @Post()
  async create(@Body() data: CreateTagDto) {
    return await this.tagsService.create(data);
  }

  @Public()
  @ApiOperation({
    summary: 'Получить тег по id',
  })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.tagsService.getById(id);
  }

  @ApiBearerAuth('access_token')
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Редактировать тег',
  })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTagDto,
  ) {
    return await this.tagsService.update(id, data);
  }

  @ApiBearerAuth('access_token')
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Удалить тег',
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.tagsService.delete(id);
  }
}
