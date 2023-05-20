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
  @ApiOperation({
    summary: 'Get list of users',
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

  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Create new user',
  })
  @Post()
  async create(@Body() data: CreateUserDto) {
    return await this.usersService.create(data);
  }

  @ApiOperation({
    summary: 'Get current user info',
  })
  @Get('me')
  async getMe(@Request() req) {
    return await this.usersService.getById(req.user.id);
  }

  @Public()
  @ApiOperation({
    summary: 'Get user by id',
  })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.getById(id);
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
    return await this.usersService.update(id, data);
  }

  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Delete user',
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.delete(id);
  }

  @ApiOperation({
    summary: 'Update current user information',
  })
  @Put('me')
  async updateMe(@Request() req, @Body() data: UpdateUserDto) {
    return await this.usersService.update(req.user.id, data);
  }
}
