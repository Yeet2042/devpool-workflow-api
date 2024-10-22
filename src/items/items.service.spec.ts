import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';

describe('ItemsService', () => {
  let service: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsService],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should add new item', async () => {
  //   const item = {
  //     item_id: 1,
  //     user_id: 1,
  //     department_id: 1,
  //     title: 'test item',
  //     amount: 10.25,
  //     quantity: 5,
  //     status: 'PENDING',
  //     create_at: new Date(),
  //     update_at: new Date(),
  //   };
  //   const result = await service.create(item);
  //   expect(result).toEqual(item);
  // });

  // it('should return all items', async () => {
  //   const items = service.findAll();
  //   expect(items).toEqual('This action returns all items');
  // });

  // it('should find item by id', async () => {
  //   const item = {
  //     item_id: 1,
  //     user_id: 1,
  //     department_id: 1,
  //     title: 'test item',
  //     amount: 10.25,
  //     quantity: 5,
  //     status: 'PENDING',
  //     create_at: new Date(),
  //     update_at: new Date(),
  //   };
  //   service.create(item);
  //   expect(service.findOne(1)).toEqual(item);
  // });

  // it('should return undefined when item not found', async () => {
  //   expect(service.findOne(999)).toBeUndefined();
  // });

  // it('should update item', async () => {
  //   const item = {
  //     item_id: 1,
  //     user_id: 1,
  //     department_id: 1,
  //     title: 'test item',
  //     amount: 10.25,
  //     quantity: 5,
  //     status: 'PENDING',
  //     create_at: new Date(),
  //     update_at: new Date(),
  //   };
  //   service.create(item);
  //   const updateItem = { title: 'test update item' };
  //   const result = await service.update(1, updateItem);
  //   expect(result).toEqual({
  //     item_id: 1,
  //     user_id: 1,
  //     department_id: 1,
  //     title: 'test update item',
  //     amount: 10.25,
  //     quantity: 5,
  //     status: 'PENDING',
  //     create_at: new Date(),
  //     update_at: new Date(),
  //   });
  // });

  // it('should return null when trying to update a non-exist item', async () => {
  //   const updateItem = { title: 'test update item' };
  //   const result = await service.update(999, updateItem);
  //   expect(result).toBeNull();
  // });

  // it('should delete item', async () => {
  //   const item = {
  //     item_id: 1,
  //     user_id: 1,
  //     department_id: 1,
  //     title: 'test item',
  //     amount: 10.25,
  //     quantity: 5,
  //     status: 'PENDING',
  //     create_at: new Date(),
  //     update_at: new Date(),
  //   };
  //   service.create(item);
  //   const result = service.remove(1);
  //   expect(result).toBeTruthy();
  // });

  // it('should return null when trying to delete a none-exist item', () => {
  //   const result = service.remove(999);
  //   expect(result).toBeNull();
  // });
});
