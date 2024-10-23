import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ItemsLoggerMiddleware implements NestMiddleware {
  private logger = new Logger();

  use(req: any, res: any, next: () => void) {
    const { ip, headers, method, originalUrl, body } = req;
    const userAgent = headers['user-agent'] || '';
    const itemId = body?.item_id || 'N/A';

    // Log เมื่อมี request เข้ามา
    this.logger.log(
      `[${new Date().toISOString()}] Method: ${method} URL: ${originalUrl}, IP: ${ip}, Agent: ${userAgent}, Item ID: ${itemId}`,
    );

    // เมื่อ response เสร็จแล้วให้บันทึกสถานะ
    res.on('finish', () => {
      const statusCode = res.statusCode;
      if (statusCode === 404 || statusCode === 500) {
        this.logger.warn(
          `[${new Date().toISOString()}] URL: ${originalUrl}, IP: ${ip}, Agent: ${userAgent}, Item ID: ${itemId} - Status: ${statusCode}`,
        );
      }
    });

    next();
  }
}
