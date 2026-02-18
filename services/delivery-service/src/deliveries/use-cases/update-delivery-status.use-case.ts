import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DeliveryRepository } from '../repositories/delivery.repository';
import { Delivery } from '../entities/delivery.entity';
import { DeliveryStatus } from 'src/enums/delivery-status.enum';

@Injectable()
export class UpdateDeliveryStatusUseCase {
  constructor(private readonly deliveryRepository: DeliveryRepository) {}

  async execute(orderId: string, newStatus: DeliveryStatus): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findByOrderId(orderId);

    if (!delivery) {
      throw new NotFoundException(`Delivery of order ${orderId} not found.`);
    }

    const allowedTransitions: Record<string, string[]> = {
      CREATED: ['IN_TRANSIT', 'CANCELLED'],
      IN_TRANSIT: ['DELIVERED', 'CANCELLED'],
      DELIVERED: [],
      CANCELLED: [],
    };

    if (!allowedTransitions[delivery.status].includes(newStatus)) {
      throw new UnprocessableEntityException(
        `Invalid status transition from ${delivery.status} to ${newStatus}`,
      );
    }

    try {
      delivery.status = newStatus;
      delivery.updatedAt = new Date();
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }

    return await this.deliveryRepository.update(delivery);
  }
}
