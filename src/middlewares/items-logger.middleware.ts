import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ItemsLoggerMiddleware implements NestMiddleware {
  private logger = new Logger();

  use(req: any, res: any, next: () => void) {
    const { ip, headers, method, originalUrl } = req;
    const userAgent = headers['user-agent'] || '';

    this.logger.log(
      `[${new Date().toISOString()}] Method: ${method} URL: ${originalUrl}, IP: ${ip}, Agent: ${userAgent}`,
    );

    res.on('finish', () => {
      const statusCode = res.statusCode;
      if (statusCode === 404 || statusCode === 500) {
        this.logger.warn(
          `[${new Date().toISOString()}] URL: ${originalUrl}, IP: ${ip}, Agent: ${userAgent} - Status: ${statusCode}`,
        );
      }
    });

    next();
  }
}
