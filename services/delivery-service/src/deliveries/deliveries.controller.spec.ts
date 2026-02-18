import { Test, TestingModule } from '@nestjs/testing';
import { DeliveriesController } from './deliveries.controller';
import { DeliveryStatus } from 'src/enums/delivery-status.enum';
import { Delivery } from './entities/delivery.entity';
import { CreateDeliveryUseCase } from './use-cases/create-delivery.use-case';
import { GetDeliveryUseCase } from './use-cases/get-delivery.use-case';
import { DeliveryRepository } from './repositories/delivery.repository';
import { UpdateDeliveryStatusUseCase } from './use-cases/update-delivery-status.use-case';

describe('DeliveriesController', () => {
  let deliveriesController: DeliveriesController;
  let createDeliveryUseCase: CreateDeliveryUseCase;
  let getDeliveryUseCase: GetDeliveryUseCase;
  let updateDeliveryStatusUseCase: UpdateDeliveryStatusUseCase;

  const mockDeliveryRepository = {
    create: jest.fn(),
    findByOrderId: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveriesController],
      providers: [
        CreateDeliveryUseCase,
        GetDeliveryUseCase,
        UpdateDeliveryStatusUseCase,
        {
          provide: DeliveryRepository,
          useValue: mockDeliveryRepository,
        },
      ],
    }).compile();

    deliveriesController =
      module.get<DeliveriesController>(DeliveriesController);
    createDeliveryUseCase = module.get<CreateDeliveryUseCase>(
      CreateDeliveryUseCase,
    );
    getDeliveryUseCase = module.get<GetDeliveryUseCase>(GetDeliveryUseCase);
    updateDeliveryStatusUseCase = module.get<UpdateDeliveryStatusUseCase>(
      UpdateDeliveryStatusUseCase,
    );
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
      .spyOn(createDeliveryUseCase, 'execute')
      .mockResolvedValue(mockResult as Delivery);

    const result = await deliveriesController.createDelivery(createDeliveryDto);

    expect(createDeliveryUseCase.execute).toHaveBeenCalledWith(
      createDeliveryDto,
    );
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

  it('should call UpdateDeliveryStatusUseCase with correct data', async () => {
    const orderId = 'uuid-123';
    const updateDto = { status: DeliveryStatus.IN_TRANSIT };
    const mockResult = { orderId, status: DeliveryStatus.IN_TRANSIT };

    jest
      .spyOn(updateDeliveryStatusUseCase, 'execute')
      .mockResolvedValue(mockResult as any);

    const result = await deliveriesController.updateDeliveryStatus(
      orderId,
      updateDto,
    );

    expect(updateDeliveryStatusUseCase.execute).toHaveBeenCalledWith(
      orderId,
      updateDto.status,
    );
    expect(result).toEqual(mockResult);
  });
});
