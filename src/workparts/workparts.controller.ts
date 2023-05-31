import {
  Controller,
  Get,
  Request,
  Body,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist/decorators';
import {
  FindAllWorkPartsDto,
  CreateWorkPartDto,
  UpdateWorkPartDto,
  FindWorkPartsByWorkIdProcessedDto,
  FindWorkPartsByWorkIdDto,
  CreateWorkPartProcessedDto,
} from './workparts.dto';
import { WorkPartsService } from './workparts.service';
import { Public } from 'src/common/public.decorator';

@ApiTags('Work Parts')
@Controller('workparts')
export class WorkPartsController {
  constructor(private workPartsService: WorkPartsService) {}

  @Public()
  @Get()
  async getAll(@Query() params: FindWorkPartsByWorkIdDto) {
    const processedParams: FindWorkPartsByWorkIdProcessedDto = {
      where: {
        workId: params.workId,
      },
    };
    return await this.workPartsService.getAll(processedParams);
  }

  @Public()
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.workPartsService.getById(id);
  }

  @ApiBearerAuth('access_token')
  @Post()
  async create(@Request() req, @Body() data: CreateWorkPartDto) {
    const processedParams: CreateWorkPartProcessedDto = {
      title: data.title,
      text: data.text,
      order: data.order,
      status: data.status,
      work: {
        connect: {
          id: data.workId,
        },
      },
      description: data.description,
      note: data.note,
    };
    return await this.workPartsService.create(req.user.id, processedParams);
  }

  @ApiBearerAuth('access_token')
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
    @Body() data: UpdateWorkPartDto,
  ) {
    return await this.workPartsService.update(id, data, req.user.id);
  }

  @ApiBearerAuth('access_token')
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return await this.workPartsService.delete(id, req.user.id);
  }
}
