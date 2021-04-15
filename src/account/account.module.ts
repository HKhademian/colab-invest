import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AuthModule } from '../auth/auth.module';
import { SystemModule } from '../system/system.module';
import { AccountResolver } from './account.resolver';
import { AccountService } from './account.service';

@Module({
	imports: [SystemModule, AuthModule],
	providers: [AccountService, AccountResolver],
	controllers: [AccountController],
})
export class AccountModule {
}
