import { Module } from '@nestjs/common';
import { SystemModule } from '../system/system.module';
import { TestResolver } from './test.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [SystemModule, AuthModule],
	exports: [],
	providers: [TestResolver],
})
export class GqlModule {

}
