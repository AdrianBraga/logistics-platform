import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from '../dto/create-delivery.dto';
import { DeliveryRepository } from '../repositories/delivery.repository';
import { Delivery } from '../entities/delivery.entity';

@Injectable()
export class CreateDeliveryUseCase {
  constructor(private readonly deliveryRepository: DeliveryRepository) {}

  async execute(deliveryData: CreateDeliveryDto): Promise<Delivery> {
    const existingDelivery = await this.deliveryRepository.findByOrderId(
      deliveryData.orderId,
    );

    if (existingDelivery) {
      throw new BadRequestException('Delivery for this order already exists');
    }

    const delivery = new Delivery({
      orderId: deliveryData.orderId,
      customer: deliveryData.customer,
      address: deliveryData.address,
      status: deliveryData.status,
    });

    return this.deliveryRepository.create(delivery);
  }
}
