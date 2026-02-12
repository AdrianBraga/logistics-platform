import { Module } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { DeliveriesController } from './deliveries.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CreateDeliveryUseCase } from './use-cases/create-delivery.usecase';

@Module({
  imports: [DatabaseModule],
  providers: [DeliveriesService, CreateDeliveryUseCase],
  controllers: [DeliveriesController],
  exports: [DeliveriesService],
})
export class DeliveriesModule {}
