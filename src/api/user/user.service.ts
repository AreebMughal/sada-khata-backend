import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  // Create User
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;

    // Check if email is already taken
    // let existingUser = await this.userRepository.findOne({ where: { email } });
    // if (existingUser) {
    //   throw new BadRequestException('Email already in use');
    // }

    const existingUser = await this.userRepository.findOne({
      where: { username }
    });
    if (existingUser) {
      throw new BadRequestException('Username already in use');
    }

    // Create and save user
    const user = this.userRepository.create({
      ...createUserDto,
      password
    });
    return this.userRepository.save(user);
  }

  // Update User
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update user details
    Object.assign(user, updateUserDto);

    return this.userRepository.save(user);
  }

  // Delete User
  async deleteUser(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }

  // Change Password
  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordDto
  ): Promise<void> {
    const { oldPassword, newPassword } = changePasswordDto;

    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Compare old password
    const passwordMatches = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatches) {
      throw new BadRequestException('Old password is incorrect');
    }

    // Hash the new password and save
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;

    await this.userRepository.save(user);
  }

  async findOneBy(where: object) {
    return await this.userRepository.findOne({ where });
  }
}
