import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class Login {
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  login: string
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string
}
