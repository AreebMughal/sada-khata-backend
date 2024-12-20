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
  async register(@Body() register: CreateUserDto): Promise<any> {
    return this.authService.signUp(register);
  }

  @Post('login')
  async loginAPI(@Body() loginDto: LoginDto): Promise<any> {
    return this.authService.login(loginDto);
  }
}
