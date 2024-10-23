import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import { DepartmentsModule } from './departments/departments.module';
import { AuthModule } from './auth/auth.module';
import dbConfig from './db/db.config';
import { LoginLoggerMiddleware } from './middlewares/login-logger.middleware';
import { ItemsLoggerMiddleware } from './middlewares/items-logger.middleware';
import { ItemsController } from './items/items.controller';
import { AdminCheckService } from './services/admin-check/admin-check.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [dbConfig] }),
    DbModule,
    ItemsModule,
    UsersModule,
    DepartmentsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AdminCheckService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoginLoggerMiddleware)
      .forRoutes({ path: '*login*', method: RequestMethod.POST });
    consumer.apply(ItemsLoggerMiddleware).forRoutes(ItemsController);
  }
}
