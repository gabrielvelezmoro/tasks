import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class accessAndRefreshTokenDto {
  @IsNotEmpty()
  @Expose()
  accessToken: string;

  @IsNotEmpty()
  @Expose()
  refreshToken: string;
}

export class userInfo {
  @Expose()
  readonly id: string;

  @Expose()
  readonly email: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly phoneNumber: string;

  @Expose()
  readonly isEmailVerified: boolean;

  @Expose()
  readonly isPhoneNumberVerified: boolean;
}

export class loginOutputDto {
  @Type(() => accessAndRefreshTokenDto)
  @ValidateNested()
  @IsNotEmpty()
  @Expose()
  readonly tokens: accessAndRefreshTokenDto;

  @Type(() => userInfo)
  @ValidateNested()
  @IsNotEmpty()
  @Expose()
  readonly user: userInfo;
}
