import { Test, TestingModule } from '@nestjs/testing';
import { DeliveriesController } from './deliveries.controller';
import { DeliveryStatus } from 'src/enums/delivery-status.enum';
import { Delivery } from './entities/delivery.entity';
import { CreateDeliveryUseCase } from './use-cases/create-delivery.use-case';
import { GetDeliveryUseCase } from './use-cases/get-delivery.use-case';

describe('DeliveriesController', () => {
  let deliveriesController: DeliveriesController;
  let deliveriesUseCase: CreateDeliveryUseCase;
  let getDeliveryUseCase: GetDeliveryUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveriesController],
      providers: [
        {
          provide: CreateDeliveryUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetDeliveryUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    deliveriesController =
      module.get<DeliveriesController>(DeliveriesController);
    deliveriesUseCase = module.get<CreateDeliveryUseCase>(
      CreateDeliveryUseCase,
    );
    getDeliveryUseCase = module.get<GetDeliveryUseCase>(GetDeliveryUseCase);
  });

  it('should call CreateDeliveryUseCase with correct data', async () => {
    const createDeliveryDto = {
      orderId: 'uuid-123',
      customer: 'John Doe',
      address: '123 Main St',
      status: DeliveryStatus.CREATED,
    };

    const mockResult = {
      id: 'any-id',
      ...createDeliveryDto,
      createdAt: new Date(),
    };

    jest
      .spyOn(deliveriesUseCase, 'execute')
      .mockResolvedValue(mockResult as Delivery);

    const result = await deliveriesController.createDelivery(createDeliveryDto);

    expect(deliveriesUseCase.execute).toHaveBeenCalledWith(createDeliveryDto);
    expect(result).toEqual(mockResult);
  });

  it('should call GetDeliveryUseCase with correct orderId', async () => {
    const orderId = 'uuid-123';
    const mockDelivery = { orderId, customer: 'John Doe' };

    jest
      .spyOn(getDeliveryUseCase, 'execute')
      .mockResolvedValue(mockDelivery as any);

    const result = await deliveriesController.getDeliveryByOrderId(orderId);

    expect(getDeliveryUseCase.execute).toHaveBeenCalledWith(orderId);
    expect(result).toEqual(mockDelivery);
  });
});
