import {
  Controller,
  Get,
  Body,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { Public } from 'src/common/public.decorator';
import {
  FindAllCommentsDto,
  CreateCommentDto,
  UpdateCommentDto,
} from './comments.dto';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Public()
  @Get()
  async getAll(@Body() params: FindAllCommentsDto) {
    return {
      success: true,
      data: await this.commentsService.getAll(params),
    };
  }

  @Public()
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.commentsService.getById(id),
    };
  }

  @Post()
  async create(@Body() data: CreateCommentDto) {
    return {
      success: true,
      data: await this.commentsService.create(data),
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCommentDto,
  ) {
    return {
      success: true,
      data: await this.commentsService.update(id, data),
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.commentsService.delete(id),
    };
  }
}
