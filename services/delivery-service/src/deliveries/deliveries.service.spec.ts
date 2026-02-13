import { Test, TestingModule } from '@nestjs/testing';
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryUseCase } from './use-cases/create-delivery.usecase';

describe('DeliveriesService', () => {
  let deliveriesService: DeliveriesService;
  let createDeliveryUseCase: CreateDeliveryUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeliveriesService,
        {
          provide: CreateDeliveryUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    deliveriesService = module.get<DeliveriesService>(DeliveriesService);
    createDeliveryUseCase = module.get<CreateDeliveryUseCase>(
      CreateDeliveryUseCase,
    );
  });

  it('should be defined', () => {
    expect(deliveriesService).toBeDefined();
  });
});
