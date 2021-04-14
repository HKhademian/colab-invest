import { Field, ObjectType } from '@nestjs/graphql';
import { Column, DeepPartial } from 'typeorm';
import { CoinData } from '../entries/coin.entity';
import { BaseEntity } from '../entries/_base.entity';

@ObjectType()
export class MineDetail implements MineDetailData {
	@Field()
	@Column()
	coinId: string;

	@Field()
	@Column()
	power: number;

	@Field()
	@Column()
	eff: number;

	private constructor() {
	}

	static from(data?: null | DeepPartial<MineDetailData>, base?: MineDetail): MineDetail | undefined {
		if (data === null) return undefined;
		return Object.assign(new MineDetail(), {
			coinId: BaseEntity.getId(data?.coinId, base?.coinId),
			power: data?.power || base?.power || 0,
			eff: data?.eff || base?.eff || 0,
		} as MineDetail);
	};
}

export type MineDetailData = {
	coinId: string | CoinData;
	power: number;
	eff: number;
};
