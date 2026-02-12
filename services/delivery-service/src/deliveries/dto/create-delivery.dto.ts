import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { DeliveryStatus } from 'src/types/delivery-status.type';

export class CreateDeliveryDto {
  @IsNotEmpty()
  @IsUUID()
  orderId: string;

  @IsNotEmpty()
  @IsString()
  customer: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsEnum(DeliveryStatus)
  @IsOptional()
  status: DeliveryStatus;
}
