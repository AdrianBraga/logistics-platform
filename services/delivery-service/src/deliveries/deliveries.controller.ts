import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { CreateDeliveryUseCase } from './use-cases/create-delivery.usecase';

@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly createDeliveryUseCase: CreateDeliveryUseCase) {}

  @Post()
  @HttpCode(201)
  async createDelivery(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.createDeliveryUseCase.execute(createDeliveryDto);
  }
}
