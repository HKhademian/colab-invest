import { Injectable } from '@nestjs/common';
import { CreateWalletDto, UpdateWalletDto } from '../dto/wallet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from '../entries/wallet.entity';

@Injectable()
export class WalletService {
	constructor(
		@InjectRepository(Wallet)
		private walletRepo: Repository<Wallet>,
	) {
	}

	create(dto: CreateWalletDto) {
		return 'This action adds a new wallet';
	}

	findAll() {
		return this.walletRepo.find();
	}

	findOne(id: string) {
		return `This action returns a #${id} wallet`;
	}

	update(id: string, dto: UpdateWalletDto) {
		return `This action updates a #${id} wallet`;
	}

	remove(id: string) {
		return `This action removes a #${id} wallet`;
	}
}
