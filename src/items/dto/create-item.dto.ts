import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateItemDto {
  @IsObject()
  @IsNotEmpty()
  user: { user_id: number };

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
