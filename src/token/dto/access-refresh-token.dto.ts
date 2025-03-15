import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class accessAndRefreshTokenDto {
  @IsNotEmpty()
  @Expose()
  accessToken: string;

  @IsNotEmpty()
  @Expose()
  refreshToken: string;
}
