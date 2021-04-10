import { Injectable } from '@nestjs/common';
import { CreateCoinDto, UpdateCoinDto } from '../dto/coin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coin } from '../entries/coin.entity';

@Injectable()
export class CoinService {
	constructor(
		@InjectRepository(Coin)
		private coinRepo: Repository<Coin>,
	) {
	}

	create(dto: CreateCoinDto) {
		return 'This action adds a new coin';
	}

	findAll() {
		return `This action returns all coin`;
	}

	findOne(id: string) {
		return `This action returns a #${id} coin`;
	}

	update(id: string, dto: UpdateCoinDto) {
		return `This action updates a #${id} coin`;
	}

	remove(id: string) {
		return `This action removes a #${id} coin`;
	}
}
