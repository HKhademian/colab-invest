import { Field, ObjectType } from '@nestjs/graphql';
import { Column, DeepPartial } from 'typeorm';
import { CoinData } from '../entries/coin.entity';
import { BaseEntity } from '../entries/_base.entity';

@ObjectType()
export class PriceDetail implements PriceDetailData {
	@Field()
	@Column()
	coinId: string;

	@Field()
	@Column()
	value: number;

	private constructor() {
	}

	static from(data?: DeepPartial<PriceDetailData>, base?: PriceDetail): PriceDetail {
		return Object.assign(new PriceDetail(), {
			coinId: BaseEntity.getId(data?.coinId, base?.coinId),
			value: data?.value || base?.value || 0,
		} as PriceDetail);
	};
}

export type PriceDetailData = {
	coinId: string | CoinData;
	value: number;
};
