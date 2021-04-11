import { Injectable, CanActivate, ExecutionContext, UseGuards, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { User } from '../system/entries/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {
	}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (!requiredRoles) {
			return true;
		}
		const { user }: { user: User } = context.switchToHttp().getRequest();
		// return requiredRoles.some((role) => user.roles?.includes(role));
		return requiredRoles.some((role) => user.role == role);
	}
}
