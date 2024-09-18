import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/entities';
import { IJwtPayload } from 'src/interfaces/jwt.interface';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.createUser({ ...createUserDto, password: hashedPassword });
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findOneBy({username});
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(username: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: IJwtPayload = { username: user.username };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
