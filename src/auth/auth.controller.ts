import { Body, Controller, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto';
import { UseJwtAuthGuard, UseLocalAuthGuard } from './auth.guard';
import { AuthUtil } from './auth.util';
import { User } from '../system/entities/user.entity';

@Controller('/auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
	) {
	}

	@Post('/register')
	async register(@Body() body: RegisterDto, @Request() req) {
		if (req.user) throw new UnauthorizedException();
		const reg_user = await this.authService.register(body);
		return await this.authService.login(reg_user);
	}

	@UseLocalAuthGuard()
	@Post('/login')
	async login(@Request() req) {
		return this.authService.login(req.user);
	}


	@UseJwtAuthGuard()
	@Post('/testJWT')
	async testJWT(@AuthUtil.GetUser() user: User) {
		return this.authService.encapsulate(user);
	}


}
