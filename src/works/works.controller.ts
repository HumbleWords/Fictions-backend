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
} from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { Public } from 'src/common/public.decorator';
import { CreateWorkDto, FindAllWorksDto, UpdateWorkDto } from './works.dto';
import { WorksService } from './works.service';

@ApiTags('Works')
@Controller('works')
export class WorksController {
  constructor(private worksService: WorksService) {}

  @Public()
  @Get()
  async getAll(@Body() params: FindAllWorksDto) {
    return {
      success: true,
      data: await this.worksService.getAll(params),
    };
  }

  @Get('myworks')
  async getMyWorks(@Request() req, @Body() params: FindAllWorksDto) {
    return {
      success: true,
      data: await this.worksService.getMyWorks(params, req.user.id),
    };
  }

  @Public()
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.worksService.getById(id),
    };
  }

  @Post()
  async create(@Request() req, @Body() data: CreateWorkDto) {
    return {
      success: true,
      data: await this.worksService.create({
        author: { connect: { id: req.user.id } },
        ...data,
      }),
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
    @Body() data: UpdateWorkDto,
  ) {
    return {
      success: true,
      data: await this.worksService.update(id, data, req.user.id),
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return {
      success: true,
      data: await this.worksService.delete(id, req.user.id),
    };
  }
}
