import { Module } from '@nestjs/common';
import { DeliveriesController } from './deliveries.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CreateDeliveryUseCase } from './use-cases/create-delivery.use-case';
import { DeliveryRepository } from './repositories/delivery.repository';
import { PrismaDeliveryRepository } from './repositories/prisma-delivery.repository';
import { GetDeliveryUseCase } from './use-cases/get-delivery.use-case';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateDeliveryUseCase,
    GetDeliveryUseCase,
    {
      provide: DeliveryRepository,
      useClass: PrismaDeliveryRepository,
    },
  ],
  controllers: [DeliveriesController],
  exports: [CreateDeliveryUseCase, GetDeliveryUseCase],
})
export class DeliveriesModule {}
