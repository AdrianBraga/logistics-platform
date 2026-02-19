import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DeliveryRepository } from '../repositories/delivery.repository';
import { Delivery } from '../entities/delivery.entity';
import { DeliveryStatus } from 'src/enums/delivery-status.enum';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class UpdateDeliveryStatusUseCase {
  constructor(
    private readonly deliveryRepository: DeliveryRepository,
    private readonly pinoLogger: PinoLogger,
  ) {
    this.pinoLogger.setContext(UpdateDeliveryStatusUseCase.name);
  }

  async execute(orderId: string, newStatus: DeliveryStatus): Promise<Delivery> {
    this.pinoLogger.info('Initiating delivery status update');

    const delivery = await this.deliveryRepository.findByOrderId(orderId);

    if (!delivery) {
      this.pinoLogger.warn('Update status failed, delivery not found');
      throw new NotFoundException(`Delivery of order ${orderId} not found.`);
    }

    const allowedTransitions: Record<string, string[]> = {
      CREATED: ['IN_TRANSIT', 'CANCELLED'],
      IN_TRANSIT: ['DELIVERED', 'CANCELLED'],
      DELIVERED: [],
      CANCELLED: [],
    };

    if (!allowedTransitions[delivery.status].includes(newStatus)) {
      this.pinoLogger.warn('Update status failed, invalid status transition');
      throw new UnprocessableEntityException(
        `Invalid status transition from ${delivery.status} to ${newStatus}`,
      );
    }

    try {
      delivery.status = newStatus;
      delivery.updatedAt = new Date();

      this.pinoLogger.info('Delivery status successfully updated');
    } catch (error) {
      this.pinoLogger.error(
        { orderId: delivery.orderId, error: error.message },
        'Unexpected error updating delivery status in database',
      );
      throw new UnprocessableEntityException(error.message);
    }

    return await this.deliveryRepository.update(delivery);
  }
}
