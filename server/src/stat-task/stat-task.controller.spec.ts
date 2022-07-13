import { Test, TestingModule } from '@nestjs/testing';
import { StatTaskController } from './stat-task.controller';

describe('StatTaskController', () => {
  let controller: StatTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatTaskController],
    }).compile();

    controller = module.get<StatTaskController>(StatTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
