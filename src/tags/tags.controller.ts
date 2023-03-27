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
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { Public } from 'src/common/public.decorator';
import { CreateTagDto, FindAllTagsDto, UpdateTagDto } from './tags.dto';
import { TagsService } from './tags.service';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Public()
  @Get()
  async getAll(@Body() params: FindAllTagsDto) {
    return {
      success: true,
      data: await this.tagsService.getAll(params),
    };
  }

  @Public()
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.tagsService.getById(id),
    };
  }

  @Post()
  async create(@Body() data: CreateTagDto) {
    return {
      success: true,
      data: await this.tagsService.create(data),
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTagDto,
  ) {
    return {
      success: true,
      data: await this.tagsService.update(id, data),
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.tagsService.delete(id),
    };
  }
}
