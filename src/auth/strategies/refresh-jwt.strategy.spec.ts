import { Test, TestingModule } from '@nestjs/testing';
import { RefreshJwtStrategy } from './refresh-jwt.strategy';

describe('RefreshJwtStrategy', () => {
  let provider: RefreshJwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefreshJwtStrategy],
    }).compile();

    provider = module.get<RefreshJwtStrategy>(RefreshJwtStrategy);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
