import { Delivery as PrismaDelivery } from '@prisma/client';
import { DeliveryStatus } from 'src/types/delivery-status.type';

export class Delivery implements PrismaDelivery {
  id: string;
  orderId: string;
  customer: string;
  address: string;
  status: DeliveryStatus;
  createdAt: Date;
  updatedAt: Date;
}
