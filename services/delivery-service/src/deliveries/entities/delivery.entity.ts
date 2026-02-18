import { randomUUID } from 'node:crypto';
import { DeliveryStatus } from 'src/enums/delivery-status.enum';
export interface DeliveryProps {
  orderId: string;
  customer: string;
  address: string;
  status?: DeliveryStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Delivery {
  readonly id: string;
  orderId: string;
  customer: string;
  address: string;
  status: DeliveryStatus;
  readonly createdAt: Date;
  updatedAt: Date;

  constructor(props: DeliveryProps, id?: string) {
    this.id = id ?? randomUUID();
    this.orderId = props.orderId;
    this.customer = props.customer;
    this.address = props.address;

    this.status = props.status ?? DeliveryStatus.CREATED;

    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }
}
