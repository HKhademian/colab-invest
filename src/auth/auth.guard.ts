import { ExecutionContext, Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
	canActivate(context: ExecutionContext): boolean {
		if (context.getType() != 'http') {
			const ctx = GqlExecutionContext.create(context);
			const { req } = ctx.getContext();
			// return super.canActivate(new ExecutionContextHost([req])) as any;
			context = new ExecutionContextHost([req]);
		}
		return super.canActivate(context) as any;
	}
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	canActivate(context: ExecutionContext): boolean {
		if (context.getType() != 'http') {
			const ctx = GqlExecutionContext.create(context);
			const { req } = ctx.getContext();
			// return super.canActivate(new ExecutionContextHost([req])) as any;
			context = new ExecutionContextHost([req]);
		}
		return super.canActivate(context) as any;
	}
}

export const UseLocalAuthGuard = () => UseGuards(LocalAuthGuard);
export const UseJwtAuthGuard = () => UseGuards(JwtAuthGuard);

