import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../system/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({ usernameField: 'email_phone' });
	}

	async validate(email_phone: string, password: string): Promise<User> {
		const user = await this.authService.validateUser(email_phone, email_phone, password);
		if (!user) throw new UnauthorizedException();
		return user;
	}
}
