import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class idDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  id: string;
}
