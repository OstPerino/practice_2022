import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    login: string;
    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password: string;
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    name: string;
}
