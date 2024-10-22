import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsObject,
} from 'class-validator';
import { Role } from '../entities/user.entity';

export class CreateUserDto {
  @IsObject()
  @IsNotEmpty()
  department: { name: string };

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  role: Role;
}
