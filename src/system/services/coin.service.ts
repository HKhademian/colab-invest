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

	findAll(): Promise<Coin[]> {
		return this.coinRepo.find();
	}

	findOne(_id: string): Promise<Coin | undefined> {
		return this.coinRepo.findOne({ _id });
	}

	update(_id: string, dto: UpdateCoinDto): Promise<unknown> {
		return this.coinRepo.update(_id, dto);
	}

	remove(_id: string): Promise<unknown> {
		return this.coinRepo.delete({ _id });
	}
}
