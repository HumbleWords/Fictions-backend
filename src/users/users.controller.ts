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
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  FindAllUsersDto,
  FindAllUsersProcessedDto,
  UpdateUserDto,
} from './users.dto';
import { Public } from 'src/common/public.decorator';
import { Roles } from 'src/common/role.decorator';
import { Role } from 'src/common/role.enum';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger/dist/decorators';

@ApiBearerAuth('access_token')
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Post()
  async getAll(
    @Body()
    params: FindAllUsersDto,
  ) {
    const processedParams: FindAllUsersProcessedDto = {
      skip: params.skip,
      take: params.take,
      orderBy: params.orderBy,
      where: {
        username: {
          contains: params.where.username,
          mode: 'insensitive',
        },
      },
    };
    return {
      success: true,
      data: await this.usersService.getAll(processedParams),
    };
  }

  @ApiOperation({
    summary: 'Get current user info',
  })
  @Get('me')
  async getMe(@Request() req) {
    return {
      success: true,
      data: await this.usersService.getById(req.user.id),
    };
  }

  @Public()
  @ApiOperation({
    summary: 'Get user by id',
  })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.usersService.getById(id),
    };
  }

  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Create new user',
  })
  @Post('new')
  async create(@Body() data: CreateUserDto) {
    return {
      success: true,
      data: await this.usersService.create(data),
    };
  }

  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Update user info',
  })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ) {
    return {
      success: true,
      data: await this.usersService.update(id, data),
    };
  }

  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Delete user',
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.usersService.delete(id),
    };
  }

  @ApiOperation({
    summary: 'Update current user information',
  })
  @Put('me')
  async updateMe(@Request() req, @Body() data: UpdateUserDto) {
    return {
      success: true,
      data: await this.usersService.update(req.user.id, data),
    };
  }
}
