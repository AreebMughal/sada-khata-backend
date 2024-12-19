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
    let var1;
    if (register.username === '') {
      var1 = 'Username is required';
    } else {
      var1 = '';
    }
    console.log(var1);
    return this.authService.signUp(register);
  }

  @Post('login')
  async LoginAPI(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
