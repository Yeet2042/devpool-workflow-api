import { LoginLoggerMiddleware } from './login-logger.middleware';

describe('LoginLoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new LoginLoggerMiddleware()).toBeDefined();
  });
});
