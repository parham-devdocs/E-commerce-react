import { Injectable } from '@nestjs/common';
import { UserRole } from './auth/entities/user.entity';

interface IsAuthorizedParams {
  currentRole: UserRole;
  requiredRole: UserRole;
}
export const ROLE_KEY = 'role';

@Injectable()
export class AccessContorlService {
  private hierarchies: Array<Map<string, number>> = [];
  private priority: number = 1;

  constructor() {
    this.buildRoles([UserRole.GUEST, UserRole.ADMIN, UserRole.USER]);
  }

  
  private buildRoles(roles: UserRole[]) {
    const hierarchy: Map<string, number> = new Map();
    roles.forEach((role) => {
      hierarchy.set(role, this.priority);
      this.priority++;
    });
    this.hierarchies.push(hierarchy);
  }

  public isAuthorized({ currentRole, requiredRole }: IsAuthorizedParams) {
    for (let hierarchy of this.hierarchies) {
      const priority = hierarchy.get(currentRole);
      const requiredPriority = hierarchy.get(requiredRole);
      console.log("dsd")
      if (priority && requiredPriority && priority >= requiredPriority) {
        return true;
      }
    }
    return false;
  }
}