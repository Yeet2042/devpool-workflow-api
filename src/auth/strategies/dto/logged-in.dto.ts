import { Department } from 'src/departments/entities/department.entity';
import { Role } from 'src/users/entities/user.entity';

export class LoggedInDto {
  user_id: number;
  name: string;
  email: string;
  role: Role;
  department: Department;
}
