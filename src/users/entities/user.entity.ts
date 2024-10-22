import { Department } from '../../departments/entities/department.entity';
import { Item } from '../../items/entities/item.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum Role {
  REQUESTER = 'REQUESTER',
  APPROVER = 'APPROVER',
  ADMIN = 'ADMIN',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @ManyToOne(() => Department, (department) => department.user, {
    nullable: false,
  })
  department: Department;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({
    nullable: false,
    default: Role.REQUESTER,
  })
  role: Role;

  @OneToMany(() => Item, (item) => item.user)
  items: Item[];
}
