import { Department } from '../../departments/entities/department.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum StatusEnum {
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

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;
}
