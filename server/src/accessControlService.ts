import { Injectable } from '@nestjs/common';
import { UserRole } from './auth/entities/user.entity';

interface IsAuthorizedParams {
  currentRole: UserRole;
  requiredRole: UserRole;
}

export const ROLE_KEY = 'role';

@Injectable()
export class AccessControlService {
  private hierarchies: Array<Map<string, number>> = [];
  private priority: number = 1;

  constructor() {
    console.log('🚀 AccessControlService initialized');
    console.log('📋 Building roles hierarchy...');
    this.buildRoles([UserRole.GUEST, UserRole.USER, UserRole.ADMIN]);
    console.log('✅ Roles hierarchy built successfully');
    console.log('📊 Current hierarchy:', this.hierarchies);
  }

  private buildRoles(roles: UserRole[]) {
    console.log(`🛠️  Building roles with: ${roles.join(', ')}`);
    const hierarchy: Map<string, number> = new Map();
    
    roles.forEach((role) => {
      console.log(`  ➕ Adding role: ${role} with priority: ${this.priority}`);
      hierarchy.set(role, this.priority);
      this.priority++;
    });
    
    console.log(`📦 Hierarchy created:`, hierarchy);
    this.hierarchies.push(hierarchy);
    console.log(`📚 Total hierarchies: ${this.hierarchies.length}`);
  }

  public isAuthorized({ currentRole, requiredRole }: IsAuthorizedParams) {
    console.log('\n🔐 Authorization check started');
    console.log(`👤 Current Role: ${currentRole}`);
    console.log(`🔑 Required Role: ${requiredRole}`);
    console.log(`📚 Checking ${this.hierarchies.length} hierarchy(s)...`);

    for (let i = 0; i < this.hierarchies.length; i++) {
      const hierarchy = this.hierarchies[i];
      console.log(`\n  🔍 Checking hierarchy #${i + 1}:`, 
        Array.from(hierarchy.entries())
      );
      
      const priority = hierarchy.get(currentRole);
      const requiredPriority = hierarchy.get(requiredRole);
      
      console.log(`  📊 Current role priority: ${priority}`);
      console.log(`  📊 Required role priority: ${requiredPriority}`);
      console.log("  🐛 Debug: dsd");
      
      if (priority && requiredPriority && priority >= requiredPriority) {
        console.log(`  ✅ AUTHORIZED: ${priority} >= ${requiredPriority}`);
        console.log(`🔐 Authorization result: ALLOWED\n`);
        return true;
      } else {
        if (!priority) {
          console.log(`  ❌ Current role "${currentRole}" not found in hierarchy`);
        }
        if (!requiredPriority) {
          console.log(`  ❌ Required role "${requiredRole}" not found in hierarchy`);
        }
        if (priority && requiredPriority && priority < requiredPriority) {
          console.log(`  ❌ Insufficient priority: ${priority} < ${requiredPriority}`);
        }
      }
    }
    
    console.log(`🔐 Authorization result: DENIED\n`);
    return false;
  }
}