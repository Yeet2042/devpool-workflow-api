import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoginLoggerMiddleware implements NestMiddleware {
  private logger = new Logger();

  use(req: any, res: any, next: () => void) {
    const { ip, headers, body } = req;
    const userAgent = headers['user-agent'] || '';
    const email = body?.email;

    this.logger.log(
      `[${new Date().toISOString()}], IP:${ip}, Agent:${userAgent}, Email: ${email}`,
      LoginLoggerMiddleware.name,
    );

    res.on('finish', () => {
      const statusCode = res.statusCode;
      if (statusCode === 401 || statusCode === 404 || statusCode === 405) {
        this.logger.warn(
          `${new Date().toISOString()}], IP:${ip}, Agent:${userAgent}, Email: ${email} - ${statusCode}`,
          LoginLoggerMiddleware.name,
        );
      }
    });

    next();
  }
}
