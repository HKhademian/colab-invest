import { Column, DeepPartial, Entity, OneToMany } from 'typeorm';
import { Coin, CoinData } from './coin.entity';
import { Source, SourceData } from './source.entity';
import { User, UserData } from './user.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, BaseEntityData } from './_base.entity';

@ObjectType()
@Entity()
export class Wallet extends BaseEntity implements WalletData {
	@Field()
	@OneToMany(_ => Source, source => source._id)
	@Column()
	readonly sourceId: string;

	@Field()
	@OneToMany(_ => Coin, coin => coin._id)
	@Column()
	readonly coinId: string;

	@Field()
	@OneToMany(_ => User, user => user._id)
	@Column({ nullable: true })
	readonly userId?: string;

	@Field()
	@Column()
	readonly type: WalletType;

	@Field()
	@Column()
	lastUpdate: number;

	@Field()
	@Column()
	value: number;

	private constructor() {
		super();
	}

	static from(data?: DeepPartial<WalletData>, base?: Wallet): Wallet {
		return Object.assign(BaseEntity.assign(new Wallet(), data, base), {
			sourceId: Source.getId(data?.sourceId, base?.sourceId),
			coinId: Coin.getId(data?.coinId, base?.coinId),
			userId: User.getId(data?.userId, base?.userId),
			type: data?.type || base?.type || undefined,
			lastUpdate: data?.lastUpdate || base?.lastUpdate || undefined,
			value: data?.value || base?.value || undefined,
		} as Wallet);
	};
}

export type WalletData = BaseEntityData & {
	readonly coinId: string | CoinData;
	readonly sourceId: string | SourceData;
	readonly userId?: null | string | UserData;
	readonly type: WalletType,
	lastUpdate: number;
	value: number;
};

type WalletType = 'live' | 'working' | 'saving';
