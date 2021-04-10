import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Coin } from './coin.entity';
import { Source } from './source.entity';
import { User } from './user.entity';

@Entity()
export class Wallet implements WalletData {
	@PrimaryColumn()
	walletId: string;

	@Column()
	@OneToMany(_ => Coin, coin => coin.coinId)
	coinId: string;

	@Column()
	@OneToMany(_ => Source, source => source.sourceId)
	sourceId: string;

	@Column({ nullable: true })
	@OneToMany(_ => User, user => user.userId)
	userId?: string;

	@Column()
	type: WalletType;

	@Column()
	lastUpdate: number;

	@Column()
	value: number;

	@Column({ nullable: true })
	desc?: string;
}

export type WalletData = {
	walletId: string;
	coinId: string | Coin;
	sourceId: string | Source;
	userId?: null | string | User;
	type: WalletType,
	lastUpdate: number;
	value: number;
	desc?: string;
};

type WalletType = 'live' | 'working' | 'saving';
