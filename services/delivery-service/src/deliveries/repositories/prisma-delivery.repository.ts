import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Delivery } from '../entities/delivery.entity';
import { DeliveryRepository } from './delivery.repository';

@Injectable()
export class PrismaDeliveryRepository implements DeliveryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(delivery: Delivery): Promise<Delivery> {
    const createdDelivery = await this.prismaService.delivery.create({
      data: {
        id: delivery.id,
        orderId: delivery.orderId,
        customer: delivery.customer,
        address: delivery.address,
      },
    });

    return createdDelivery as Delivery;
  }

  async findByOrderId(orderId: string): Promise<Delivery | null> {
    const delivery = await this.prismaService.delivery.findUnique({
      where: {
        orderId,
      },
    });

    return delivery as Delivery | null;
  }
}
