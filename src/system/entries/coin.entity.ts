import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Coin implements CoinData {
	@PrimaryColumn()
	coinId: string;

	@Column()
	title: string;

	@Column()
	sign: string;

	@Column()
	value: number;

	@Column()
	precision: number;

	@Column('simple-json', { nullable: true })
	power?: { profit: number; unit: string; };

	@Column({ nullable: true })
	desc?: string;
}

export type CoinData = {
	coinId: string;
	title: string;
	sign: string;
	value: number;
	precision: number;
	power?: 'no' | { profit: number; unit: string; }
	desc?: string;
};
