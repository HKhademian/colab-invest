import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users/user.entity';

@Injectable()
export class AppService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
	) {
	}

	getHello(): string {
		return 'Hello World!';
	}

	async getTest(): Promise<string> {
		const res = await this.usersRepository.findOne();

		return res?.title || 'nothing';
	}

	async getTest2(): Promise<string> {
		const res = await this.usersRepository.create();
		res.title = 'nothing special';
		await this.usersRepository.save(res);
		return res.title;
	}
}
