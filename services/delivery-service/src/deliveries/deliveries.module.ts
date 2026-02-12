import { Module } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { DeliveriesController } from './deliveries.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [DeliveriesService],
  controllers: [DeliveriesController],
  exports: [DeliveriesService],
})
export class DeliveriesModule {}
