import { PerfLoggerInterceptor } from './perf-logger.interceptor';

describe('PerfLoggerInterceptor', () => {
  it('should be defined', () => {
    expect(new PerfLoggerInterceptor()).toBeDefined();
  });
});
