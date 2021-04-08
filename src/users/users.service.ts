import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { errHttp } from '../util';
import { AuthUtil } from '../auth/auth.util';
import { isEmail } from 'class-validator';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
	) {
	}

	async findOne(email?: string, phone?: string): Promise<User | undefined> {
		email = isEmail(email) && email;
		phone = AuthUtil.toPhone(phone);
		if (email) return this.usersRepository.findOne({ email });
		if (phone) return this.usersRepository.findOne({ phone });
		return null;
	}

	async create(name: string, email: string, phone: string, password: string): Promise<User> {
		email = (isEmail(email) && email) || errHttp('email required');
		phone = AuthUtil.toPhone(phone) || errHttp('phone required');
		!await this.usersRepository.findOne({ email }) || errHttp('email exists');
		!await this.usersRepository.findOne({ phone }) || errHttp('phone exists');
		const user = new User({
			name, title: 'New User',
			email, phone, password: await AuthUtil.hashPassword(password),
		});
		await this.usersRepository.save(user);
		return user;
	}
}
