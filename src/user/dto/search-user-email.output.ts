import { Expose } from 'class-transformer';

export class searchUserEmailOutputDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  name: string;
}
