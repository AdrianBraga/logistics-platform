import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';

@Injectable()
export class DeliveriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(deliveryData: CreateDeliveryDto) {
    return this.prisma.delivery.create({
      data: deliveryData,
    });
  }
}
