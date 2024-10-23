import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { DepartmentsModule } from 'src/departments/departments.module';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), DepartmentsModule],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
