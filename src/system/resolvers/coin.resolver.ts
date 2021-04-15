import { Query, Args, Resolver, ID } from '@nestjs/graphql';
import { CoinService } from '../services/coin.service';
import { Coin } from '../entities/coin.entity';

@Resolver()
export class CoinResolver {
	constructor(private readonly coinService: CoinService) {
	}

	@Query(_ => Coin)
	async coin(@Args('_id', { type: () => ID }) _id: string): Promise<Coin | undefined> {
		return await this.coinService.findOne(_id);
	}

	@Query(_ => [Coin])
	async coins(): Promise<Coin[]> {
		return await this.coinService.findAll();
	}
}
