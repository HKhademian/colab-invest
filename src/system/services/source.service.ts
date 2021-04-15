import { Injectable } from '@nestjs/common';
import { CreateSourceDto, UpdateSourceDto } from '../dto/source.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Source } from '../entities/source.entity';

@Injectable()
export class SourceService {
	constructor(
		@InjectRepository(Source)
		private sourceRepo: Repository<Source>,
	) {
	}

	create(dto: CreateSourceDto) {
		return 'This action adds a new source';
	}

	findAll() {
		return this.sourceRepo.find();
	}

	findOne(id: string) {
		return `This action returns a #${id} source`;
	}

	update(id: string, dto: UpdateSourceDto) {
		return `This action updates a #${id} source`;
	}

	remove(id: string) {
		return `This action removes a #${id} source`;
	}
}
