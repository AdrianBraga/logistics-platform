import { Delivery } from '../entities/delivery.entity';

export abstract class DeliveryRepository {
  abstract create(delivery: Delivery): Promise<Delivery>;
  abstract findByOrderId(orderId: string): Promise<Delivery | null>;
}
