import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from '../dto/create-delivery.dto';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class CreateDeliveryUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(deliveryData: CreateDeliveryDto) {
    const existingDelivery = await this.prisma.delivery.findFirst({
      where: { orderId: deliveryData.orderId },
    });

    if (existingDelivery) {
      throw new BadRequestException('Delivery for this order already exists');
    }

    return this.prisma.delivery.create({ data: deliveryData });
  }
}
