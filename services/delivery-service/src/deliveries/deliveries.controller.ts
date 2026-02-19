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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('deliveries')
@Controller('deliveries')
export class DeliveriesController {
  constructor(
    private readonly createDeliveryUseCase: CreateDeliveryUseCase,
    private readonly getDeliveryUseCase: GetDeliveryUseCase,
    private readonly updateDeliveryStatusUseCase: UpdateDeliveryStatusUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new delivery' })
  @ApiResponse({
    status: 201,
    description: 'Delivery created successfully.',
    type: Delivery,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  @HttpCode(201)
  async createDelivery(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.createDeliveryUseCase.execute(createDeliveryDto);
  }

  @Get(':orderId')
  @ApiOperation({ summary: 'Get delivery details by Order ID' })
  @ApiParam({
    name: 'orderId',
    description: 'The UUID of the order',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Delivery found.',
    type: Delivery,
  })
  @ApiResponse({
    status: 404,
    description: 'Delivery not found.',
  })
  async getDeliveryByOrderId(
    @Param('orderId') orderId: string,
  ): Promise<Delivery> {
    return await this.getDeliveryUseCase.execute(orderId);
  }

  @Patch(':orderId/status')
  @ApiOperation({ summary: 'Update the status of a delivery' })
  @ApiParam({
    name: 'orderId',
    description: 'The UUID of the order',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'The delivery status has been successfully updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid status value or missing required fields.',
  })
  @ApiResponse({
    status: 422,
    description: 'Invalid status transition.',
  })
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
