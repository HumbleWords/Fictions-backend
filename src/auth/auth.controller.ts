import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger/dist';
import { LocalAuthGuard } from 'src/common/local-auth.guard';
import { Public } from 'src/common/public.decorator';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: 'Войти в систему',
  })
  @Post('login')
  async login(@Request() req, @Body() data: LoginDto) {
    return await this.authService.login(req.user);
  }

  @Public()
  @ApiOperation({
    summary: 'Зарегистрироваться',
  })
  @Post('register')
  async register(@Body() body: RegisterDto) {
    return await this.authService.register(body);
  }
}
