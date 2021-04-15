import { Args, Resolver, Mutation, Query } from '@nestjs/graphql';
import { User } from '../system/entities/user.entity';
import { UserService } from '../system/services/user.service';
import { WalletService } from '../system/services/wallet.service';
import { WorkerService } from '../system/services/worker.service';
import { AuthService } from '../auth/auth.service';
import { UseJwtAuthGuard } from '../auth/auth.guard';
import { AuthUtil } from '../auth/auth.util';
import { UpdateInfoDto, UpdatePolicyDto, UpdateUsernameDto } from './account.dto';

@UseJwtAuthGuard()
@Resolver()
export class AccountResolver {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
		private readonly walletService: WalletService,
		private readonly workerService: WorkerService,
	) {
	}

	@Query(_ => User)
	async profile(@AuthUtil.GetUser() user): Promise<User> {
		return this.authService.encapsulate(user);
	}

	@Mutation(_ => User)
	async updateProfileInfo(@AuthUtil.GetUser() user, @Args() data: UpdateInfoDto) {
		return this.authService.encapsulate(user);
	}

	@Mutation(_ => User)
	async updateUsername(@AuthUtil.GetUser() user, @Args() data: UpdateUsernameDto) {
		return this.authService.encapsulate(user);
	}

	@Mutation(_ => User)
	async updatePolicy(@AuthUtil.GetUser() user, @Args() data: UpdatePolicyDto) {
		return this.authService.encapsulate(user);
	}

	@Query(_ => User)
	async profileWallets(@AuthUtil.GetUser() user) {
		return this.walletService.findByUser(user);
	}

	@Query(_ => User)
	async profileWorkers(@AuthUtil.GetUser() user) {
		return this.workerService.findByUser(user);
	}

}
