import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async register(@Body() register: CreateUserDto, hre: any) {
    return this.authService.signUp(register);
  }

  @Post('login')
  async Login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
