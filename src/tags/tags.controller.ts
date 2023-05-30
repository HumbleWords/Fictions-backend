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

@ApiBearerAuth('access_token')
@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Public()
  @ApiOperation({
    summary: 'Get list of tags',
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

  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Create tag',
  })
  @Post()
  async create(@Body() data: CreateTagDto) {
    return await this.tagsService.create(data);
  }

  @Public()
  @ApiOperation({
    summary: 'Get tag by id',
  })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.tagsService.getById(id);
  }

  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Update tag'
  })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTagDto,
  ) {
    return await this.tagsService.update(id, data);
  }

  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Delete tag'
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.tagsService.delete(id);
  }
}
