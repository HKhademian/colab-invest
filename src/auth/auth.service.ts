import { Repository } from 'typeorm';
import { isEmail } from 'class-validator';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../system/entities/user.entity';
import { UserService } from '../system/services/user.service';
import { generateId } from '../util';
import { RegisterDto } from './dto';
import { AuthUtil } from './auth.util';

type Auth = User;

@Injectable()
export class AuthService {
	constructor(
		private usersService: UserService,
		private jwtService: JwtService,
		@InjectRepository(User)
		private usersRepository: Repository<User>,
	) {
	}

	async validateUser(email?: string, phone?: string, password?: string): Promise<Auth> {
		const user = await this.usersService.search(email, phone);
		if (!user || !await user.checkPassword(password)) return null;
		return user;
	}

	async validateAuth(authId: string): Promise<User> {
		const user = await this.usersRepository.findOne({ authId });
		if (!user) throw new UnauthorizedException();
		return user;
	}

	async login(user: User) {
		user.authId = generateId(15);
		await this.usersRepository.save(user);
		const payload = { sub: user.authId, title: user.title, name: user.name };
		return { access_token: this.jwtService.sign(payload) };
	}

	encapsulate(user: User): User {
		if (user) {
			// if (user.role != 'admin') delete (user as any).role;
			delete user.password;
			delete user.authId;
		}
		return user;
	}

	async register({ name, email, phone, password }: RegisterDto): Promise<Auth> {
		email = isEmail(email) && email;
		phone = AuthUtil.toPhone(phone);
		return await this.usersService.register(name, email, phone, password);
	}

}
