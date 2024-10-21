import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  create(createItemDto: CreateItemDto) {
    const item = {
      item_id: 1,
      user_id: 1,
      department_id: 1,
      title: 'test item',
      amount: 10.25,
      quantity: 5,
      status: 'PENDING',
      create_at: new Date(),
      update_at: new Date(),
    };
    return item;
  }

  findAll() {
    return `This action returns all items`;
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
