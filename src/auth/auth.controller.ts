import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators';
import { LocalAuthGuard } from 'src/common/local-auth.guard';
import { Public } from 'src/common/public.decorator';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() data: LoginDto) {
    return {
      success: true,
      data: await this.authService.login(req.user),
    };
  }

  @Public()
  @Post('register')
  async register(@Body() body: RegisterDto) {
    return {
      success: true,
      data: await this.authService.register(body),
    };
  }
}
