import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}
