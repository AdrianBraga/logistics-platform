import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateDeliveryDto } from '../dto/create-delivery.dto';

@Injectable()
export class CreateDeliveryUseCase {
  constructor(private prisma: PrismaService) {}

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
