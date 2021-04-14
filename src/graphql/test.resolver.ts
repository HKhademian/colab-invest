import { Query, Args, Resolver, ID } from '@nestjs/graphql';
import { CoinService } from '../system/services/coin.service';
import { Coin } from '../system/entries/coin.entity';
import { Company } from '../system/entries/company.entity';

@Resolver()
export class TestResolver {
	constructor(private readonly coinService: CoinService) {
	}

	coinlist: Coin[] = [
		Coin.from({ title: 'coin1' }),
		Coin.from({ title: 'coin2' }),
	];

	companylist: Company[] = [
		Company.from({ title: 'comp1' }),
		Company.from({ title: 'comp2' }),
	];

	@Query(returns => Coin)
	async coin(@Args('coinId', { type: () => ID }) coinId: string) {
		return this.coinlist.find(it => it._id == coinId);
	}

	@Query(returns => [Coin])
	async coins(): Promise<Coin[]> {
		return this.coinlist;
		// return await this.coinService.findAll();
	}


	@Query(returns => Company)
	async company(@Args('companyId', { type: () => ID }) companyId: string) {
		return this.companylist.find(it => it._id == companyId);
	}

	@Query(returns => [Company])
	async companies(): Promise<Company[]> {
		return this.companylist;
		// return await this.coinService.findAll();
	}
}
