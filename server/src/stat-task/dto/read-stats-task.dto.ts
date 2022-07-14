import { IsString, IsNotEmpty, IsEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ReadStatsTaskDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  timeClient: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  interval: string;
}
