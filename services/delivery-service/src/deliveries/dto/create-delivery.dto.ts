import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { DeliveryStatus } from 'src/enums/delivery-status.enum';

export class CreateDeliveryDto {
  @ApiProperty({
    description: 'The unique identification of the order',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty()
  @IsUUID()
  readonly orderId: string;

  @ApiProperty({
    description: 'Full name of the customer',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  readonly customer: string;

  @ApiProperty({
    description: 'Complete delivery address',
    example: '123 Main St, Springfield',
  })
  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @ApiPropertyOptional({
    enum: DeliveryStatus,
    default: DeliveryStatus.CREATED,
    description: 'Initial status of the delivery',
  })
  @IsEnum(DeliveryStatus)
  @IsOptional()
  readonly status: DeliveryStatus;
}
