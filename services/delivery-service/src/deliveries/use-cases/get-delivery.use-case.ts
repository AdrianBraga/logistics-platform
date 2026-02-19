import { Injectable, NotFoundException } from '@nestjs/common';
import { DeliveryRepository } from '../repositories/delivery.repository';
import { Delivery } from '../entities/delivery.entity';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class GetDeliveryUseCase {
  constructor(
    private readonly deliveryRepository: DeliveryRepository,
    private readonly pinoLogger: PinoLogger,
  ) {
    this.pinoLogger.setContext(GetDeliveryUseCase.name);
  }

  async execute(orderId: string): Promise<Delivery> {
    this.pinoLogger.info('Initiating get delivery by order ID', { orderId });

    const delivery = await this.deliveryRepository.findByOrderId(orderId);

    if (!delivery) {
      this.pinoLogger.warn(
        { orderId: orderId },
        'Delivery not found for the given order ID',
      );
      throw new NotFoundException('Delivery not found for the given order ID');
    }

    this.pinoLogger.info({ data: delivery }, 'Delivery successfully retrieved');

    return delivery;
  }
}
