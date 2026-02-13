import { Test, TestingModule } from '@nestjs/testing';
import { DeliveriesController } from './deliveries.controller';
import { DeliveriesService } from './deliveries.service';
import { DeliveryStatus } from 'src/types/delivery-status.type';
import { Delivery } from './entities/delivery.entity';

describe('DeliveriesController', () => {
  let controller: DeliveriesController;
  let service: DeliveriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveriesController],
      providers: [
        {
          provide: DeliveriesService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DeliveriesController>(DeliveriesController);
    service = module.get<DeliveriesService>(DeliveriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call DeliveriesService.create and return a delivery', async () => {
    const createDeliveryDto = {
      orderId: '114a83e0-f179-4a46-88e9-3b97c905bfb7',
      customer: 'John Doe',
      address: 'Rua A',
      status: DeliveryStatus.PENDING,
    };

    const mockDelivery: Delivery = {
      id: '3a9f25c3-a55d-4bde-9c19-dd2e40874d5a',
      ...createDeliveryDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(service, 'create').mockResolvedValue(mockDelivery);

    const result = await controller.createDelivery(createDeliveryDto);

    expect(service.create).toHaveBeenCalledWith(createDeliveryDto);
    expect(result).toEqual(mockDelivery);
  });
});
