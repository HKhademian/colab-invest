import { Body, Controller, Get, Patch } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { WorkerService } from '../system/services/worker.service';
import { UseJwtAuthGuard } from '../auth/auth.guard';
import { AuthUtil } from '../auth/auth.util';
import { UpdateInfoDto, UpdatePolicyDto, UpdateUsernameDto } from './account.dto';

@UseJwtAuthGuard()
@Controller('/account')
export class AccountController {
	constructor(
		private readonly authService: AuthService,
		private readonly workerService: WorkerService,
	) {
	}

	@Get()
	async profile(@AuthUtil.GetUser() user) {
		return this.authService.encapsulate(user);
	}

	@Patch('/info')
	async updateInfo(@AuthUtil.GetUser() user, @Body() data: UpdateInfoDto) {
		return this.authService.encapsulate(user);
	}

	@Patch('/username')
	async updateUsername(@AuthUtil.GetUser() user, @Body() data: UpdateUsernameDto) {
		return this.authService.encapsulate(user);
	}

	@Patch('/policy')
	async updatePolicy(@AuthUtil.GetUser() user, @Body() data: UpdatePolicyDto) {
		return this.authService.encapsulate(user);
	}

	@Get('/assets/wallets')
	async wallets(@AuthUtil.GetUser() user) {
		// TODO: query all wallets and return value
		return { wallets: [] };
	}

	@Get('/assets/workers')
	async workers(@AuthUtil.GetUser() user) {
		return this.workerService.findByUser(user);
	}
}
