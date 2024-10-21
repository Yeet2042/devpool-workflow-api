import { Item } from 'src/items/entities/item.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  department_id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @OneToMany(() => User, (user) => user.department)
  user: User[];

  @OneToMany(() => Item, (item) => item.department)
  item: Item[];
}
