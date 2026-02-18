import { IsEnum, IsNotEmpty } from 'class-validator';
import { DeliveryStatus } from 'src/enums/delivery-status.enum';

export class UpdateDeliveryStatusDto {
  @IsEnum(DeliveryStatus, {
    message: 'Invalid status. Use: CREATED, IN_TRANSIT, DELIVERED ou CANCELLED',
  })
  @IsNotEmpty()
  status: DeliveryStatus;
}
