import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The first name of the user',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The first name of the user',
  })
  @IsString()
  @IsOptional()
  lastName: string;

  //   @ApiProperty({
  //     example: 'abc@yopmail.com',
  //     description: 'The email of the user',
  //   })
  //   @IsEmail()
  //   @IsNotEmpty()
  //   email: string;

  @ApiProperty({ example: 'abc1122' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '****' })
  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
