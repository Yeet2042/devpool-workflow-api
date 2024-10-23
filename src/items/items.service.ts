import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item, StatusEnum } from './entities/item.entity';
import { Repository } from 'typeorm';
import { DepartmentsService } from 'src/departments/departments.service';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private itemRepo: Repository<Item>,
    private DepartmentsService: DepartmentsService,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const departmentId = await this.DepartmentsService.findByUser(
      createItemDto.user.user_id,
    );

    const itemWithDepartmentId = {
      ...createItemDto,
      user: { user_id: createItemDto.user.user_id },
      department: { department_id: departmentId.department_id },
    };
    return this.itemRepo.save(itemWithDepartmentId);
  }

  findAll() {
    return this.itemRepo.find({
      relations: ['user', 'department'],
      select: { user: { user_id: true, name: true, role: true } },
    });
  }

  async findOne(id: number) {
    const item = await this.itemRepo.findOne({
      where: { item_id: id },
      relations: ['user', 'department'],
      select: { user: { user_id: true, name: true, role: true } },
    });
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemRepo.findOne({ where: { item_id: id } });
    if (!item) throw new NotFoundException('Item not found');
    return this.itemRepo.save({ item_id: id, ...updateItemDto });
  }

  async approve(id: number) {
    if (!id) throw new NotFoundException('Id should not empty');
    const item = await this.itemRepo.findOne({ where: { item_id: id } });
    if (!item) throw new NotFoundException('Item not found');
    item.status = StatusEnum.APPROVED;
    return this.itemRepo.save(item);
  }

  async reject(id: number) {
    if (!id) throw new NotFoundException('Id should not empty');
    const item = await this.itemRepo.findOne({ where: { item_id: id } });
    if (!item) throw new NotFoundException('Item not found');
    item.status = StatusEnum.REJECTED;
    return this.itemRepo.save(item);
  }

  async remove(id: number) {
    const item = await this.itemRepo.findOne({
      where: { item_id: id },
      relations: ['user', 'department'],
      select: { user: { user_id: true, name: true, role: true } },
    });
    if (!item) throw new NotFoundException('Item not found');
    return this.itemRepo.remove(item);
  }
}
