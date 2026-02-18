import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { DeliveryRepository } from '../repositories/delivery.repository';
import { Delivery } from '../entities/delivery.entity';
import { GetDeliveryUseCase } from './get-delivery.use-case';
import { DeliveryStatus } from 'src/enums/delivery-status.enum';

describe('GetDeliveryUseCase', () => {
  let getDeliveryUseCase: GetDeliveryUseCase;
  let deliveryRepository: DeliveryRepository;

  const mockDelivery = new Delivery({
    orderId: 'uuid-123',
    customer: 'John Doe',
    address: 'Main Street, 100',
    status: DeliveryStatus.CREATED,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetDeliveryUseCase,
        {
          provide: DeliveryRepository,
          useValue: {
            findByOrderId: jest.fn(),
          },
        },
      ],
    }).compile();

    getDeliveryUseCase = module.get<GetDeliveryUseCase>(GetDeliveryUseCase);
    deliveryRepository = module.get<DeliveryRepository>(DeliveryRepository);
  });

  it('should be defined', () => {
    expect(getDeliveryUseCase).toBeDefined();
  });

  it('should return a delivery if it exists', async () => {
    jest
      .spyOn(deliveryRepository, 'findByOrderId')
      .mockResolvedValue(mockDelivery);

    const result = await getDeliveryUseCase.execute('uuid-123');

    expect(result).toEqual(mockDelivery);
    expect(deliveryRepository.findByOrderId).toHaveBeenCalledWith('uuid-123');
  });

  it('should throw a NotFoundException if delivery does not exist', async () => {
    jest.spyOn(deliveryRepository, 'findByOrderId').mockResolvedValue(null);

    await expect(
      getDeliveryUseCase.execute('invalid-order-id'),
    ).rejects.toThrow(NotFoundException);
    expect(deliveryRepository.findByOrderId).toHaveBeenCalledWith(
      'invalid-order-id',
    );
  });
});
