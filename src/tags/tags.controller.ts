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
import { CreateTagDto, FindAllTagsDto, UpdateTagDto } from './tags.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  async getAll(@Body() params: FindAllTagsDto) {
    return await this.tagsService.getAll(params);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.tagsService.getById(id);
  }

  @Post()
  async create(@Body() data: CreateTagDto) {
    return await this.tagsService.create(data);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTagDto,
  ) {
    return await this.tagsService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.tagsService.delete(id);
  }
}
