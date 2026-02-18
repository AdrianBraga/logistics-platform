import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryRepository } from '../repositories/delivery.repository';
import { CreateDeliveryUseCase } from './create-delivery.use-case';
import { DeliveryStatus } from 'src/enums/delivery-status.enum';
import { BadRequestException } from '@nestjs/common';
import { Delivery } from '../entities/delivery.entity';

describe('CreateDeliveryUseCase', () => {
  let createDeliveryUseCase: CreateDeliveryUseCase;
  let deliveryRepository: DeliveryRepository;

  const mockDeliveryRepository = {
    findByOrderId: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateDeliveryUseCase,
        {
          provide: DeliveryRepository,
          useValue: mockDeliveryRepository,
        },
      ],
    }).compile();

    createDeliveryUseCase = module.get<CreateDeliveryUseCase>(
      CreateDeliveryUseCase,
    );
    deliveryRepository = module.get<DeliveryRepository>(DeliveryRepository);
  });

  it('should be defined', () => {
    expect(createDeliveryUseCase).toBeDefined();
  });

  it('should create a delivery successfully', async () => {
    const createDeliveryDto = {
      orderId: 'uuid-123',
      customer: 'John Doe',
      address: '123 Main St',
      status: DeliveryStatus.CREATED,
    };

    mockDeliveryRepository.findByOrderId.mockResolvedValue(null);
    mockDeliveryRepository.create.mockImplementation((delivery) =>
      Promise.resolve(delivery),
    );

    const result = await createDeliveryUseCase.execute(createDeliveryDto);

    expect(result).toBeDefined();
    expect(result.orderId).toBe(createDeliveryDto.orderId);
    expect(result.customer).toBe(createDeliveryDto.customer);
    expect(deliveryRepository.create).toHaveBeenCalledWith(
      await expect.objectContaining({
        orderId: createDeliveryDto.orderId,
        customer: createDeliveryDto.customer,
        address: createDeliveryDto.address,
        status: DeliveryStatus.CREATED,
      }),
    );
  });

  it('should throw BadRequestException if delivery already exists', async () => {
    const createDeliveryDto = {
      orderId: 'uuid-123',
      customer: 'John Doe',
      address: '123 Main St',
    };

    mockDeliveryRepository.findByOrderId.mockResolvedValue(
      new Delivery({ ...createDeliveryDto, status: DeliveryStatus.CREATED }),
    );

    await expect(
      createDeliveryUseCase.execute(createDeliveryDto as any),
    ).rejects.toThrow(BadRequestException);

    expect(deliveryRepository.create).not.toHaveBeenCalled();
  });
});
