import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { CreateDeliveryUseCase } from './use-cases/create-delivery.use-case';
import { GetDeliveryUseCase } from './use-cases/get-delivery.use-case';
import { Delivery } from './entities/delivery.entity';
import { UpdateDeliveryStatusUseCase } from './use-cases/update-delivery-status.use-case';
import { UpdateDeliveryStatusDto } from './dto/update-delivery-status.dto';

@Controller('deliveries')
export class DeliveriesController {
  constructor(
    private readonly createDeliveryUseCase: CreateDeliveryUseCase,
    private readonly getDeliveryUseCase: GetDeliveryUseCase,
    private readonly updateDeliveryStatusUseCase: UpdateDeliveryStatusUseCase,
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

  @Patch(':orderId/status')
  @HttpCode(200)
  async updateDeliveryStatus(
    @Param('orderId') orderId: string,
    @Body() updateDeliveryStatusDto: UpdateDeliveryStatusDto,
  ) {
    return await this.updateDeliveryStatusUseCase.execute(
      orderId,
      updateDeliveryStatusDto.status,
    );
  }
}
