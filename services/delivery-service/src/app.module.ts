import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
@Module({
  imports: [DeliveriesModule, DatabaseModule],
})
export class AppModule {}
