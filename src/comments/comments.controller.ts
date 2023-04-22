import {
  Controller,
  Get,
  Body,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger/dist';
import { Public } from 'src/common/public.decorator';
import {
  FindAllCommentsDto,
  CreateCommentDto,
  UpdateCommentDto,
} from './comments.dto';
import { CommentsService } from './comments.service';

@ApiBearerAuth('access_token')
@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Public()
  @ApiOperation({
    summary: 'Get list of comments by workPartId',
  })
  @Post()
  async getAll(@Body() params: FindAllCommentsDto) {
    return {
      success: true,
      data: await this.commentsService.getAll(params),
    };
  }

  @Public()
  @ApiOperation({
    summary: 'Get a comment by id',
  })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.commentsService.getById(id),
    };
  }

  @ApiOperation({
    summary: 'Post new comment',
  })
  @Post('new')
  async create(@Body() data: CreateCommentDto) {
    return {
      success: true,
      data: await this.commentsService.create(data),
    };
  }

  @ApiOperation({
    summary: 'Update a comment',
  })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
    @Body() data: UpdateCommentDto,
  ) {
    return {
      success: true,
      data: await this.commentsService.update(id, data, req.user.id),
    };
  }

  @ApiOperation({
    summary: 'Delete a comment',
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return {
      success: true,
      data: await this.commentsService.delete(id, req.user.id),
    };
  }
}
