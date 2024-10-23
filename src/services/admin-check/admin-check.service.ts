import {
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { DepartmentsService } from 'src/departments/departments.service';
import { Role } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminCheckService implements OnApplicationBootstrap {
  constructor(
    private readonly departmentsService: DepartmentsService,
    private readonly usersService: UsersService,
  ) {}

  async onApplicationBootstrap() {
    const departmentName = process.env.ADMIN_DEPARTMENT;
    const name = process.env.ADMIN_NAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    try {
      await this.departmentsService.findByName(departmentName);
    } catch (error) {
      if (error instanceof NotFoundException) {
        await this.departmentsService.create({
          name: departmentName,
        });
        console.log('\x1b[42mAdmin department created!\x1b[0m');
      } else {
        throw error;
      }
    }

    const adminUser = await this.usersService.findOneByEmail(`${email}`);

    if (!adminUser) {
      const hashPass = await this.usersService.hashPassword(password);

      const newAdminUser = await this.usersService.create({
        department: {
          name: departmentName,
        },
        name,
        email,
        password: hashPass,
        role: Role.ADMIN,
      });

      if (newAdminUser) {
        console.log('\x1b[42mAdmin user created!\x1b[0m');
      } else {
        console.log('\x1b[41mError while creating admin user\x1b[0m');
        return;
      }
    }

    console.log('\x1b[46m---------- Admin User ----------\x1b[0m');
    console.log('Department: ', departmentName);
    console.log('Email:      ', email);
    console.log('Password:   ', password);
    console.log('\x1b[46m--------------------------------\x1b[0m');
  }
}
