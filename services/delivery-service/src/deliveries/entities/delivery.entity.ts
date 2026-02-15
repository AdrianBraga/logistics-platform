import { randomUUID } from 'node:crypto';
import { DeliveryStatus } from 'src/enums/delivery-status.enum';

export class Delivery {
  id: string;
  orderId: string;
  customer: string;
  address: string;
  status: DeliveryStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    props: Omit<Delivery, 'id' | 'createdAt' | 'updatedAt'>,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id ?? randomUUID();
    this.orderId = props.orderId;
    this.customer = props.customer;
    this.address = props.address;
    this.status = props.status ?? DeliveryStatus.CREATED;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }
}
