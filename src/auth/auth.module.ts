import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { SystemModule } from '../system/system.module';

import { jwtConstants } from './constants';

@Module({
	imports: [
		SystemModule,
		PassportModule,
		JwtModule.register(jwtConstants),
	],
	exports: [AuthService, JwtModule],
	providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
	controllers: [AuthController],
})
export class AuthModule {
}
