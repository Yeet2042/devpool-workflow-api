import { Injectable, NotFoundException } from '@nestjs/common';
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

  create(createDepartmentDto: CreateDepartmentDto) {
    return this.departmentRepo.save(createDepartmentDto);
  }

  findAll() {
    return this.departmentRepo.find();
  }

  findOne(id: number) {
    return this.departmentRepo.findOne({ where: { department_id: id } });
  }

  async findByName(name: string): Promise<Department | null> {
    return this.departmentRepo.findOne({ where: { name: name } });
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
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
      throw new NotFoundException(`Not found: id = ${id}`);
    }
    return this.departmentRepo.delete({ department_id: id });
  }
}
