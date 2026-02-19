import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from '../dto/create-delivery.dto';
import { DeliveryRepository } from '../repositories/delivery.repository';
import { Delivery } from '../entities/delivery.entity';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class CreateDeliveryUseCase {
  constructor(
    private readonly deliveryRepository: DeliveryRepository,
    private readonly pinoLogger: PinoLogger,
  ) {
    this.pinoLogger.setContext(CreateDeliveryUseCase.name);
  }

  async execute(deliveryData: CreateDeliveryDto): Promise<Delivery> {
    this.pinoLogger.info('Initiating delivery creation');

    const existingDelivery = await this.deliveryRepository.findByOrderId(
      deliveryData.orderId,
    );

    if (existingDelivery) {
      this.pinoLogger.warn(
        { orderId: deliveryData.orderId },
        'Creation failed, delivery already exists',
      );
      throw new BadRequestException('Delivery for this order already exists');
    }

    try {
      const delivery = new Delivery({
        orderId: deliveryData.orderId,
        customer: deliveryData.customer,
        address: deliveryData.address,
        status: deliveryData.status,
      });

      const savedDelivery = await this.deliveryRepository.create(delivery);

      this.pinoLogger.info('Delivery successfully created');

      return savedDelivery;
    } catch (error) {
      this.pinoLogger.error(
        { orderId: deliveryData.orderId, error: error.message },
        'Unexpected error creating delivery in database',
      );
      throw error;
    }
  }
}
