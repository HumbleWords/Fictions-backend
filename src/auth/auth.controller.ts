import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/common/local-auth.guard';
import { Public } from 'src/common/public.decorator';
import { RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
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
