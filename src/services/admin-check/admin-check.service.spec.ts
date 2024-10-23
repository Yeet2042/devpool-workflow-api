import { Test, TestingModule } from '@nestjs/testing';
import { AdminCheckService } from './admin-check.service';

describe('AdminCheckService', () => {
  let service: AdminCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminCheckService],
    }).compile();

    service = module.get<AdminCheckService>(AdminCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
