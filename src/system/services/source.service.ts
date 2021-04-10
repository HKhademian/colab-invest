import { Injectable } from '@nestjs/common';
import { CreateSourceDto, UpdateSourceDto } from '../dto/source.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coin } from '../entries/coin.entity';
import { Repository } from 'typeorm';
import { Source } from '../entries/source.entity';

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
		return `This action returns all source`;
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
