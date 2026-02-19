import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { DeliveryStatus } from 'src/enums/delivery-status.enum';

export class UpdateDeliveryStatusDto {
  @ApiProperty({
    description: 'The status of the delivery',
    enum: DeliveryStatus,
    example: DeliveryStatus.IN_TRANSIT,
  })
  @IsEnum(DeliveryStatus, {
    message: 'Invalid status. Use: CREATED, IN_TRANSIT, DELIVERED ou CANCELLED',
  })
  @IsNotEmpty()
  status: DeliveryStatus;
}
