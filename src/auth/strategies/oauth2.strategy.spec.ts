import { Test, TestingModule } from '@nestjs/testing';
import { Oauth2Strategy } from './oauth2.strategy';

describe('Oauth2Strategy', () => {
  let provider: Oauth2Strategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Oauth2Strategy],
    }).compile();

    provider = module.get<Oauth2Strategy>(Oauth2Strategy);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
