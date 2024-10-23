import { ItemsLoggerMiddleware } from './items-logger.middleware';

describe('ItemsLoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new ItemsLoggerMiddleware()).toBeDefined();
  });
});
