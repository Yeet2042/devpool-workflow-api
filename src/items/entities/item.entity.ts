import { Department } from 'src/departments/entities/department.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

enum StatusEnum {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  item_id: number;

  @ManyToOne(() => User, (user) => user.items, { nullable: false })
  user: User;

  @ManyToOne(() => Department, (department) => department.item, {
    nullable: false,
  })
  department: Department;

  @Column({ nullable: false })
  title: string;

  @Column('decimal', { precision: 20, scale: 4, nullable: false })
  amount: number;

  @Column({ nullable: false })
  quantity: number;

  @Column({
    nullable: false,
    default: StatusEnum.PENDING,
  })
  status: StatusEnum;
}
