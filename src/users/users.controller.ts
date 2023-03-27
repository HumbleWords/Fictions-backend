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
import { CreateUserDto, FindAllUsersDto, UpdateUserDto } from './users.dto';
import { Public } from 'src/common/public.decorator';
import { Roles } from 'src/common/role.decorator';
import { Role } from 'src/common/role.enum';
import { ApiTags } from '@nestjs/swagger/dist/decorators';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Get()
  async getAll(
    @Body()
    params: FindAllUsersDto,
  ) {
    return {
      success: true,
      data: await this.usersService.getAll(params),
    };
  }

  @Public()
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.usersService.getById(id),
    };
  }

  @Roles(Role.Admin)
  @Post()
  async create(@Body() data: CreateUserDto) {
    return {
      success: true,
      data: await this.usersService.create(data),
    };
  }

  @Roles(Role.Admin)
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
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      data: await this.usersService.delete(id),
    };
  }

  @Put('me')
  async updateMe(@Request() req, @Body() data: UpdateUserDto) {
    return {
      success: true,
      data: await this.usersService.update(req.user.id, data),
    };
  }
}
