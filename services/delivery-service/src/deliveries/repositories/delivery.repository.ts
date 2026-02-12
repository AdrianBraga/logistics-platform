import { Delivery } from '../entities/delivery.entity';

export interface DeliveryRepository {
  create(delivery: Delivery): Promise<Delivery>;
}
