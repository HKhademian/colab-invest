import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entries/user.entity';
import { isEmail } from 'class-validator';
import { AuthUtil } from '../../auth/auth.util';
import { errHttp } from '../../util';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepo: Repository<User>,
	) {
	}

	create(dto: CreateUserDto) {
		return 'This action adds a new user';
	}

	findAll() {
		return this.userRepo.find();
	}

	findOne(id: string) {
		return `This action returns a #${id} user`;
	}

	update(id: string, dto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: string) {
		return `This action removes a #${id} user`;
	}


	async search(email?: string, phone?: string): Promise<User | undefined> {
		email = isEmail(email) && email;
		phone = AuthUtil.toPhone(phone);
		if (email) return this.userRepo.findOne({ email });
		if (phone) return this.userRepo.findOne({ phone });
		return null;
	}

	async register(name: string, email: string, phone: string, password: string): Promise<User> {
		email = (isEmail(email) && email) || errHttp('email required');
		phone = AuthUtil.toPhone(phone) || errHttp('phone required');
		!await this.userRepo.findOne({ email }) || errHttp('email exists');
		!await this.userRepo.findOne({ phone }) || errHttp('phone exists');
		const user = new User({
			name, title: 'New User',
			email, phone, password: await AuthUtil.hashPassword(password),
		});
		await this.userRepo.save(user);
		return user;
	}
}
