import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger/dist';
import { LocalAuthGuard } from 'src/common/local-auth.guard';
import { Public } from 'src/common/public.decorator';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: 'Login to the system',
  })
  @Post('login')
  async login(@Request() req, @Body() data: LoginDto) {
    return {
      success: true,
      data: await this.authService.login(req.user),
    };
  }

  @Public()
  @ApiOperation({
    summary: 'Register a new user',
  })
  @Post('register')
  async register(@Body() body: RegisterDto) {
    return {
      success: true,
      data: await this.authService.register(body),
    };
  }
}
