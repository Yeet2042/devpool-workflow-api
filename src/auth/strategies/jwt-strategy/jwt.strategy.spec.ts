import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { LoggedInDto } from '../dto/logged-in.dto';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              if (key === 'JWT_SECRET') {
                return 'your_jwt_secret';
              }
              return null;
            }),
          },
        },
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(jwtStrategy).toBeDefined();
  });

  // it('should validate payload', () => {
  //   const payload: LoggedInDto = { user_id: 1, name: 'test' };
  //   expect(jwtStrategy.validate(payload)).toEqual(payload);
  // });

  // it('should return secret from config', () => {
  //   expect(configService.get('JWT_SECRET')).toEqual('your_jwt_secret');
  // });
});
