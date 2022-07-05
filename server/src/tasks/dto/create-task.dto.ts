import { IsString, IsNotEmpty, IsInt, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    content: string;

    //title: string;

    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    authorId: number;
}
