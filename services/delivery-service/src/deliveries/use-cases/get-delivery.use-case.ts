import { Injectable, NotFoundException } from '@nestjs/common';
import { DeliveryRepository } from '../repositories/delivery.repository';
import { Delivery } from '../entities/delivery.entity';

@Injectable()
export class GetDeliveryUseCase {
  constructor(private readonly deliveryRepository: DeliveryRepository) {}

  async execute(orderId: string): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findByOrderId(orderId);

    if (!delivery) {
      throw new NotFoundException('Delivery not found for the given order ID');
    }

    return delivery;
  }
}
