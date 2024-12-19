import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/entities';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    const salt: string = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return this.userService.createUser({
      ...createUserDto,
      password: hashedPassword
    });
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findOneBy({ username });
    if (!user) {
      console.log('User not found');
      return null;
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (isPasswordValid) {
      return user;
    } else {
      console.log('Invalid password');
      return null;
    }
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    return {
      user,
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET
      })
    };
  }
}
