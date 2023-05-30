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
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger/dist';
import { Public } from 'src/common/public.decorator';
import {
  FindAllCommentsDto,
  CreateCommentDto,
  UpdateCommentDto,
  FindAllCommentsProcessedDto,
  CreateCommentProcessedDto,
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
  @Get()
  async getAll(@Query() params: FindAllCommentsDto) {
    const processedParams: FindAllCommentsProcessedDto = {
      skip: params.skip,
      take: params.take,
      where: {
        workPartId: params.workPartId,
        parentId: params.parentId || undefined,
      },
      orderBy: {
        createdAt: params.orderBy,
      },
    };
    return await this.commentsService.getAll(processedParams);
  }

  @ApiOperation({
    summary: 'Post new comment',
  })
  @Post()
  async create(@Request() req, @Body() data: CreateCommentDto) {
    let processedParams: CreateCommentProcessedDto = {
      text: data.text,
      user: {
        connect: {
          id: req.user.id,
        },
      },
      workPart: {
        connect: {
          id: data.workPartId,
        },
      },
    };
    processedParams = data.parentId
      ? { ...processedParams, parent: { connect: { id: data.parentId } } }
      : processedParams;
    return await this.commentsService.create(processedParams);
  }

  @Public()
  @ApiOperation({
    summary: 'Get a comment by id',
  })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.commentsService.getById(id);
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
    return await this.commentsService.update(id, data, req.user.id);
  }

  @ApiOperation({
    summary: 'Delete a comment',
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return await this.commentsService.delete(id, req.user.id);
  }
}
