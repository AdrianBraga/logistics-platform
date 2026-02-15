import { Module } from '@nestjs/common';
import { DeliveriesController } from './deliveries.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CreateDeliveryUseCase } from './use-cases/create-delivery.usecase';
import { DeliveryRepository } from './repositories/delivery.repository';
import { PrismaDeliveryRepository } from './repositories/prisma-delivery.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateDeliveryUseCase,
    {
      provide: DeliveryRepository,
      useClass: PrismaDeliveryRepository,
    },
  ],
  controllers: [DeliveriesController],
  exports: [CreateDeliveryUseCase],
})
export class DeliveriesModule {}
