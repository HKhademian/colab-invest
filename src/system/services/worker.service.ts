import { Injectable } from '@nestjs/common';
import { CreateWorkerDto, UpdateWorkerDto } from '../dto/worker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Worker } from '../entities/worker.entity';
import { UserData } from '../entities/user.entity';
import { BaseEntity } from '../entities/_base.entity';

@Injectable()
export class WorkerService {
	constructor(
		@InjectRepository(Worker)
		private workerRepo: Repository<Worker>,
	) {
	}

	create(dto: CreateWorkerDto) {
		return 'This action adds a new worker';
	}

	findAll() {
		return this.workerRepo.find();
	}

	findOne(id: string) {
		return `This action returns a #${id} worker`;
	}

	update(id: string, dto: UpdateWorkerDto) {
		return `This action updates a #${id} worker`;
	}

	remove(id: string) {
		return `This action removes a #${id} worker`;
	}


	async findByUser(user: string | UserData): Promise<Worker[]> {
		const userId = BaseEntity.getId(user);
		return (await this.workerRepo.find()).filter(it => !!it.owners.find(owner => owner.userId == userId));
	}
}
