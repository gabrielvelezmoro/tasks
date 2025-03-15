import { IsEmail, IsNotEmpty } from 'class-validator';

export class loginInputDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
