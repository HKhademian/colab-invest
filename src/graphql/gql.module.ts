import { Module } from '@nestjs/common';
import { SystemModule } from '../system/system.module';
import { TestResolver } from './test.resolver';

@Module({
	imports: [SystemModule],
	exports: [],
	providers: [TestResolver],
})
export class GqlModule {

}
