import { Department } from '../../../departments/entities/department.entity';
import { Role } from '../../../users/entities/user.entity';

export class LoggedInDto {
  user_id: number;
  name: string;
  email: string;
  role: Role;
  department: Department;
  sub?: number;
}
