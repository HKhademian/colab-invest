import { Injectable } from '@nestjs/common';
import { CreateWorkerDto, UpdateWorkerDto } from '../dto/worker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Worker } from '../entries/worker.entity';
import { isEmail } from 'class-validator';
import { AuthUtil } from '../../auth/auth.util';
import { errHttp } from '../../util';

@Injectable()
export class WorkerService {
	constructor(
		@InjectRepository(Worker)
		private workerRepository: Repository<Worker>,
	) {
	}

	create(dto: CreateWorkerDto) {
		return 'This action adds a new worker';
	}

	findAll() {
		return `This action returns all worker`;
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
}
