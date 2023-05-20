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
  FindAllFandomsDto,
  CreateFandomDto,
  UpdateFandomDto,
  FindAllFandomsProcessedDto,
} from './fandoms.dto';
import { FandomsService } from './fandoms.service';
import { Roles } from 'src/common/role.decorator';
import { Role } from 'src/common/role.enum';

@ApiBearerAuth('access_token')
@ApiTags('Fandoms')
@Controller('fandoms')
export class FandomsController {
  constructor(private fandomsService: FandomsService) {}

  @Public()
  @ApiOperation({
    summary: 'Get list of fandoms',
  })
  @Get()
  async getAll(@Query() params: FindAllFandomsDto) {
    const processedParams: FindAllFandomsProcessedDto = {
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
    return await this.fandomsService.getAll(processedParams);
  }

  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Create fandom',
  })
  @Post()
  async create(@Body() data: CreateFandomDto) {
    return await this.fandomsService.create(data);
  }

  @Public()
  @ApiOperation({
    summary: 'Get fandom by id',
  })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.fandomsService.getById(id);
  }

  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Update fandom',
  })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateFandomDto,
  ) {
    return await this.fandomsService.update(id, data);
  }

  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Delete fandom',
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.fandomsService.delete(id);
  }
}
