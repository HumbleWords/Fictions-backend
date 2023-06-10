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

@ApiTags('Комментарии')
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Public()
  @ApiOperation({
    summary: 'Получить список комментариев к части раборы по workPartId',
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

  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: 'Создать новый комментарий',
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

  @Get('work/:id')
  async getByWorkId(@Param('id', ParseIntPipe) workId: number) {
    return await this.commentsService.getByWorkId(workId);
  }

  @Public()
  @ApiOperation({
    summary: 'Получить комментарий по id',
  })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.commentsService.getById(id);
  }

  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: 'Редактировать комментарий',
  })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
    @Body() data: UpdateCommentDto,
  ) {
    return await this.commentsService.update(id, data, req.user.id);
  }

  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: 'Удалить комментарий',
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return await this.commentsService.delete(id, req.user.id);
  }
}
