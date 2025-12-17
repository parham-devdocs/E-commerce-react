// change-role.dto.ts
import { IsEnum } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class ChangeRoleDto {
  @IsEnum(UserRole)
  role: UserRole; // ← this ensures it's 'admin' or 'user', not the enum object
}