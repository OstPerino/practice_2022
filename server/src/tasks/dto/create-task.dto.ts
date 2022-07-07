import { IsString, IsNotEmpty, IsEmpty, IsInt, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDto {
    @IsOptional()
    @IsEmpty()
    id: number

    @IsString()
    @IsNotEmpty()
    content: string;

    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    authorId: number;

    @IsOptional()
    @IsEmpty()
    time: number;

    @IsOptional()
    @IsEmpty()
    status: boolean;

    @IsOptional()
    @IsEmpty()
    start_time: number;
}
