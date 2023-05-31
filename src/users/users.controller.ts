import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  ParseIntPipe,
  Request,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  FindAllUsersDto,
  FindAllUsersProcessedDto,
  UpdateUserDto,
} from './users.dto';
import { Public } from '../common/public.decorator';
import { Roles } from '../common/role.decorator';
import { Role } from '../common/role.enum';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger/dist/decorators';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @ApiOperation({
    summary: 'Получить список пользователей',
  })
  @Get()
  async getAll(
    @Query()
    params: FindAllUsersDto,
  ) {
    const processedParams: FindAllUsersProcessedDto = {
      skip: params.skip,
      take: params.take,
      orderBy: { username: params.orderBy },
      where: {
        username: {
          contains: params.where,
          mode: 'insensitive',
        },
      },
    };
    return await this.usersService.getAll(processedParams);
  }

  @ApiBearerAuth('access_token')
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Создать нового пользователя',
  })
  @Post()
  async create(@Body() data: CreateUserDto) {
    return await this.usersService.create(data);
  }

  @Public()
  @ApiOperation({
    summary: 'Получить пользователя по id',
  })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.getById(id);
  }

  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: 'Получить информацию о текущем пользователе',
  })
  @Get('me')
  async getMe(@Request() req) {
    return await this.usersService.getById(req.user.id);
  }

  @ApiBearerAuth('access_token')
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Обновить информацию о пользователе',
  })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ) {
    return await this.usersService.update(id, data);
  }

  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: 'Обновить информацию о текущем пользователе',
  })
  @Put('me')
  async updateMe(@Request() req, @Body() data: UpdateUserDto) {
    return await this.usersService.update(req.user.id, data);
  }

  @ApiBearerAuth('access_token')
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Удалить пользователя',
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.delete(id);
  }
}
