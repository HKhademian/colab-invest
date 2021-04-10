import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Company } from './company.entity';
import { Coin } from './coin.entity';

@Entity()
export class Product implements ProductData {
	@PrimaryColumn()
	productId: string;

	@Column()
	@OneToMany(_ => Company, company => company.companyId)
	companyId: string;

	@Column()
	life: number;

	@Column('simple-json')
	price: { coinId: string, value: number };

	@Column('simple-json')
	mine: { coinId: string, power: number, eff: number };

	@Column()
	status: number;

	@Column({ nullable: true })
	link?: string;

	@Column({ nullable: true })
	desc?: string;
}

export type ProductData = {
	productId: string;
	companyId: string | Company;
	life: number;
	price: { coinId: string | Coin, value: number };
	mine: { coinId: string | Coin, power: number, eff: number };
	status: number;
	link?: string;
	desc?: string;
};
