import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { DepartmentsService } from '../departments/departments.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private departmentsService: DepartmentsService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(password, salt);
    return hashPass;
  }

  async create(createUserDto: CreateUserDto) {
    const conflict = await this.usersRepo.findOne({
      where: { email: createUserDto.email },
    });
    if (conflict) {
      throw new ConflictException('This email already exists');
    }

    const hashPass = await this.hashPassword(createUserDto.password);

    const departmentId = await this.departmentsService.findByName(
      createUserDto.department.name,
    );

    const userWithHashPass = {
      ...createUserDto,
      password: hashPass,
      department: { department_id: departmentId.department_id },
    };

    const createdUser = await this.usersRepo.save(userWithHashPass);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPass } = createdUser;

    return userWithoutPass;
  }

  findAll() {
    return this.usersRepo.find({
      relations: ['department'],
      select: { user_id: true, name: true, email: true, role: true },
    });
  }

  async findOne(id: number) {
    const user = await this.usersRepo.findOne({
      where: { user_id: id },
      relations: ['department'],
      select: { user_id: true, name: true, email: true, role: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  findAllByDepartment(name: string) {
    return this.usersRepo.find({
      where: { department: { name } },
      relations: ['department'],
      select: { user_id: true, name: true, email: true, role: true },
    });
  }

  async findOneByDepartmentAndId(name: string, id: number) {
    const user = await this.usersRepo.findOne({
      where: { user_id: id, department: { name } },
      relations: ['department'],
      select: { user_id: true, name: true, email: true, role: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    if (!email) {
      return null;
    }
    return this.usersRepo.findOne({
      where: { email },
      relations: ['department'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    //check user
    const user = await this.usersRepo.findOne({ where: { user_id: id } });
    if (!user) throw new NotFoundException('User not found');

    //check equal email
    if (user.email === updateUserDto.email) {
      return updateUserDto;
    }

    //check conflict
    const conflict = await this.usersRepo.findOne({
      where: { email: updateUserDto.email },
    });
    if (conflict) {
      throw new ConflictException('This email already exists');
    }

    return this.usersRepo.save({
      user_id: id,
      ...updateUserDto,
    });
  }

  async remove(id: number) {
    const user = await this.usersRepo.findOne({ where: { user_id: id } });
    if (!user) throw new NotFoundException('User not found');
    return this.usersRepo.remove(user);
  }
}
