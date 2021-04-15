import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AuthModule } from '../auth/auth.module';
import { SystemModule } from '../system/system.module';
import { AccountResolver } from './account.resolver';

@Module({
	imports: [SystemModule, AuthModule],
	providers: [AccountService, AccountResolver],
	controllers: [AccountController],
})
export class AccountModule {
}
