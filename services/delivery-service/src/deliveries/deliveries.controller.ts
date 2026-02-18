import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { CreateDeliveryUseCase } from './use-cases/create-delivery.use-case';
import { GetDeliveryUseCase } from './use-cases/get-delivery.use-case';
import { Delivery } from './entities/delivery.entity';

@Controller('deliveries')
export class DeliveriesController {
  constructor(
    private readonly createDeliveryUseCase: CreateDeliveryUseCase,
    private readonly getDeliveryUseCase: GetDeliveryUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  async createDelivery(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.createDeliveryUseCase.execute(createDeliveryDto);
  }

  @Get(':orderId')
  async getDeliveryByOrderId(
    @Param('orderId') orderId: string,
  ): Promise<Delivery> {
    return await this.getDeliveryUseCase.execute(orderId);
  }
}
