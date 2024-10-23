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
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/entities/user.entity';
import { RolesGuard } from 'src/auth/guards/roles-auth/roles.guard';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.ADMIN])
  @Get('/all')
  findAll() {
    return this.itemsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.ADMIN])
  @Get('/all/:id')
  findOneById(@Param('id') id: string) {
    return this.itemsService.findOneById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':department')
  findAllByDepartment(@Param('department') name: string) {
    return this.itemsService.findAllByDepartment(name);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':department/:id')
  findOneByDepartmentAndId(
    @Param('department') name: string,
    @Param('id') id: string,
  ) {
    return this.itemsService.findOneByDepartmentAndId(name, +id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':department/:id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.ADMIN, Role.APPROVER])
  @Patch(':department/:id/approve')
  approve(@Param('id') id: string) {
    return this.itemsService.approve(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([Role.ADMIN, Role.APPROVER])
  @Patch(':department/:id/reject')
  reject(@Param('id') id: string) {
    return this.itemsService.reject(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':department/:id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}
