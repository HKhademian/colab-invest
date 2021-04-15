import { Args, Resolver, Mutation, Query } from '@nestjs/graphql';
import { UserService } from '../system/services/user.service';
import { Request, UnauthorizedException } from '@nestjs/common';
import { User } from '../system/entities/user.entity';
import { AuthUtil } from './auth.util';
import { AuthService } from './auth.service';
import { UseJwtAuthGuard } from './auth.guard';
import { LoginDto, LoginResult, RegisterDto } from './dto';

@Resolver()
export class AuthResolver {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
	) {
	}

	@Mutation(_ => LoginResult)
	async register(@Args() body: RegisterDto, @Request() req): Promise<LoginResult> {
		if (req?.user) throw new UnauthorizedException();
		const reg_user = await this.authService.register(body);
		return await this.authService.login(reg_user);
	}

	@Mutation(_ => LoginResult)
	async login(@Args() { email_phone, password }: LoginDto, @Request() req): Promise<LoginResult> {
		if (req?.user) throw new UnauthorizedException();
		const reg_user = await this.authService.validateUser(email_phone, email_phone, password);
		if (!reg_user) throw new UnauthorizedException();
		return await this.authService.login(reg_user);
	}

	@UseJwtAuthGuard()
	@Query(_ => User)
	async testJWT(@AuthUtil.GetUser() user): Promise<User> {
		return this.authService.encapsulate(user);
	}
}
