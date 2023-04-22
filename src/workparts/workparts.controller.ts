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
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist/decorators';
import {
  FindAllWorkPartsDto,
  CreateWorkPartDto,
  UpdateWorkPartDto,
} from './workparts.dto';
import { WorkPartsService } from './workparts.service';

@ApiBearerAuth("access_token")
@ApiTags('Work Parts')
@Controller('workparts')
export class WorkPartsController {
  constructor(private workPartsService: WorkPartsService) {}

  @Post()
  async getAll(@Body() params: FindAllWorkPartsDto) {
    return await this.workPartsService.getAll(params);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.workPartsService.getById(id);
  }

  @Post('new')
  async create(@Request() req, @Body() data: CreateWorkPartDto) {
    return await this.workPartsService.create(req.user.id, data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
    @Body() data: UpdateWorkPartDto,
  ) {
    return await this.workPartsService.update(id, data, req.user.id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return await this.workPartsService.delete(id, req.user.id);
  }
}
