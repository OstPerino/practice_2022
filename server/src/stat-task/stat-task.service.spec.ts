import { Test, TestingModule } from '@nestjs/testing';
import { StatTaskService } from './stat-task.service';

describe('StatTaskService', () => {
  let service: StatTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatTaskService],
    }).compile();

    service = module.get<StatTaskService>(StatTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
