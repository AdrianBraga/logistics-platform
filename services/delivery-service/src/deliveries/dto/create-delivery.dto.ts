import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { DeliveryStatus } from 'src/enums/delivery-status.enum';

export class CreateDeliveryDto {
  @IsNotEmpty()
  @IsUUID()
  readonly orderId: string;

  @IsNotEmpty()
  @IsString()
  readonly customer: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsEnum(DeliveryStatus)
  @IsOptional()
  readonly status: DeliveryStatus;
}
