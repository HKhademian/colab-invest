import { Column, DeepPartial, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { PowerDetail, PowerDetailData } from '../structs/powerDetail.data';
import { BaseEntity, BaseEntityData } from './_base.entity';

@ObjectType()
@Entity()
export class Coin extends BaseEntity implements CoinData {
	@Field()
	@Column()
	title: string;

	@Field()
	@Column()
	sign: string;

	@Field()
	@Column()
	value: number;

	@Field()
	@Column()
	precision: number;

	@Field({ nullable: true })
	@Column('simple-json', { nullable: true })
	power?: PowerDetail;

	private constructor() {
		super();
	}

	static from(data?: DeepPartial<CoinData>, base?: Coin): Coin {
		return Object.assign(BaseEntity.assign(new Coin(), data, base), {
			title: data?.title || base?.title || 'newCoin',
			sign: data?.sign || base?.sign || 'NEW_COIN',
			value: data?.value || base?.value || 0,
			precision: data?.precision || base?.precision || 0,
			power: data?.power === null ? undefined : PowerDetail.from(data?.power, base?.power),
		} as Coin);
	};
}

export type CoinData = BaseEntityData & {
	title: string;
	sign: string;
	value: number;
	precision: number;
	power?: null | PowerDetailData;
};
