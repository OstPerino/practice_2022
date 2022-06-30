import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// TODO: Не реализовано
export class UpdateUserDto extends PartialType(CreateUserDto) {}
