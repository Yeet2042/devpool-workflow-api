import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

enum StatusEnum {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  item_id: number;

  @ManyToOne(() => User, (user) => user.items)
  user: User;

  @ManyToOne(() => Department, (department) => department.items)
  department: Department;

  @Column()
  title: string;

  @Column()
  amount: number;

  @Column()
  quantity: number;

  @Column()
  status: StatusEnum;
}
