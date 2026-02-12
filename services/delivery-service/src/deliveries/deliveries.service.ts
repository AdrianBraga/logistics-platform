import { Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { CreateDeliveryUseCase } from './use-cases/create-delivery.usecase';

@Injectable()
export class DeliveriesService {
  constructor(private createDeliveryUseCase: CreateDeliveryUseCase) {}

  async create(deliveryData: CreateDeliveryDto) {
    return await this.createDeliveryUseCase.execute(deliveryData);
  }
}
