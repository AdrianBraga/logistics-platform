import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryRepository } from '../repositories/delivery.repository';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Delivery } from '../entities/delivery.entity';
import { UpdateDeliveryStatusUseCase } from './update-delivery-status.use-case';
import { DeliveryStatus } from 'src/enums/delivery-status.enum';

describe('UpdateDeliveryStatusUseCase', () => {
  let updateDeliveryStatusUseCase: UpdateDeliveryStatusUseCase;
  let deliveryRepository: DeliveryRepository;

  const mockDeliveryRepository = {
    findByOrderId: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateDeliveryStatusUseCase,
        {
          provide: DeliveryRepository,
          useValue: mockDeliveryRepository,
        },
      ],
    }).compile();

    updateDeliveryStatusUseCase = module.get<UpdateDeliveryStatusUseCase>(
      UpdateDeliveryStatusUseCase,
    );
    deliveryRepository = module.get<DeliveryRepository>(DeliveryRepository);
  });

  it('should be defined', () => {
    expect(updateDeliveryStatusUseCase).toBeDefined();
  });

  it('should update delivery status successfully', async () => {
    const orderId = 'uuid-123';
    const existingDelivery = new Delivery({
      orderId,
      customer: 'John Doe',
      address: 'Main Street, 100',
      status: DeliveryStatus.CREATED,
    });

    mockDeliveryRepository.findByOrderId.mockResolvedValue(existingDelivery);
    mockDeliveryRepository.update.mockImplementation((delivery) =>
      Promise.resolve(delivery),
    );

    const result = await updateDeliveryStatusUseCase.execute(
      orderId,
      DeliveryStatus.IN_TRANSIT,
    );

    expect(result.status).toBe(DeliveryStatus.IN_TRANSIT);
    expect(deliveryRepository.update).toHaveBeenCalled();
    expect(deliveryRepository.findByOrderId).toHaveBeenCalledWith(orderId);
  });

  it('should throw NotFoundException if delivery does not exist', async () => {
    mockDeliveryRepository.findByOrderId.mockResolvedValue(null);

    await expect(
      updateDeliveryStatusUseCase.execute(
        'invalid-id',
        DeliveryStatus.IN_TRANSIT,
      ),
    ).rejects.toThrow(NotFoundException);

    expect(deliveryRepository.update).not.toHaveBeenCalled();
  });

  it('should throw UnprocessableEntityException for invalid transition', async () => {
    const orderId = 'uuid-123';
    const existingDelivery = new Delivery({
      orderId,
      customer: 'John Doe',
      address: 'Main Street, 100',
      status: DeliveryStatus.CREATED,
    });

    mockDeliveryRepository.findByOrderId.mockResolvedValue(existingDelivery);

    await expect(
      updateDeliveryStatusUseCase.execute(orderId, DeliveryStatus.DELIVERED),
    ).rejects.toThrow(UnprocessableEntityException);

    expect(deliveryRepository.update).not.toHaveBeenCalled();
  });

  it('should throw UnprocessableEntityException when updating a CANCELLED delivery', async () => {
    const orderId = 'uuid-123';
    const cancelledDelivery = new Delivery({
      orderId,
      customer: 'John Doe',
      address: 'Main Street, 100',
      status: DeliveryStatus.CANCELLED,
    });

    mockDeliveryRepository.findByOrderId.mockResolvedValue(cancelledDelivery);

    await expect(
      updateDeliveryStatusUseCase.execute(orderId, DeliveryStatus.IN_TRANSIT),
    ).rejects.toThrow(UnprocessableEntityException);

    expect(deliveryRepository.update).not.toHaveBeenCalled();
  });
});
