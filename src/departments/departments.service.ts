import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentRepo: Repository<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    const department = await this.departmentRepo.findOne({
      where: { name: createDepartmentDto.name },
    });
    if (department) {
      throw new ConflictException('This department already exists');
    }
    return this.departmentRepo.save(createDepartmentDto);
  }

  findAll() {
    return this.departmentRepo.find();
  }

  async findOne(id: number) {
    const department = await this.departmentRepo.findOne({
      where: { department_id: id },
    });
    if (!department) {
      throw new NotFoundException('Department not found');
    }
    return this.departmentRepo.findOne({ where: { department_id: id } });
  }

  async findByName(name: string): Promise<Department | null> {
    const department = await this.departmentRepo.findOne({
      where: { name },
    });
    if (!department) {
      throw new NotFoundException('Department not found');
    }
    return department;
  }

  async findByUser(user_id: number): Promise<Department | null> {
    const department = await this.departmentRepo.findOne({
      where: { user: { user_id } },
    });
    if (!department) {
      throw new NotFoundException('Department not found');
    }
    return department;
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const department = await this.departmentRepo.findOne({
      where: { department_id: id },
    });
    if (!department) {
      throw new NotFoundException('Department not found');
    }

    if (department.name === updateDepartmentDto.name) {
      return department;
    }

    const conflict = await this.departmentRepo.findOne({
      where: { name: updateDepartmentDto.name },
    });
    if (conflict) {
      throw new ConflictException('This name already exists');
    }

    return this.departmentRepo.save({
      department_id: id,
      ...updateDepartmentDto,
    });
  }

  async remove(id: number) {
    const department = await this.departmentRepo.findOne({
      where: { department_id: id },
    });
    if (!department) {
      throw new NotFoundException('Department not found');
    }
    return this.departmentRepo.delete({ department_id: id });
  }
}
