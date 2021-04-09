import { Body, Controller, Get, Patch, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UseJwtAuthGuard } from '../auth/auth.guard';
import { UpdateInfoDto, UpdatePolicyDto, UpdateUsernameDto } from './account.dto';

@UseJwtAuthGuard()
@Controller('/account')
export class AccountController {
	constructor(
		private readonly authService: AuthService,
	) {
	}

	@Get()
	async profile(@Request() req) {
		return this.authService.encapsulate(req.user);
	}

	@Patch('/info')
	async updateInfo(@Request() req, @Body() data: UpdateInfoDto) {
		return this.authService.encapsulate(req.user);
	}

	@Patch('/username')
	async updateUsername(@Request() req, @Body() data: UpdateUsernameDto) {
		return this.authService.encapsulate(req.user);
	}

	@Patch('/policy')
	async updatePolicy(@Request() req, @Body() data: UpdatePolicyDto) {
		return this.authService.encapsulate(req.user);
	}

	@Get('/assets/wallets')
	async wallets(@Request() req) {
		// TODO: query all wallets and return value
		return { wallets: [] };
	}

	@Get('/assets/workers')
	async workers(@Request() req) {
		// TODO: query all workers and return value
		return { workers: [] };
	}
}
