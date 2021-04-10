import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Company } from './company.entity';
import { Product } from './product.entity';

@Entity()
export class Source implements SourceData {
	@PrimaryColumn()
	sourceId: string;

	@Column()
	@OneToMany(_ => Company, company => company.companyId)
	companyId: string;

	@Column('simple-json', { nullable: true })
	reinvest?: ReInvestPolicy;

	@Column({ nullable: true })
	title?: string;

	@Column({ nullable: true })
	login?: string;

	@Column({ nullable: true })
	link?: string;

	@Column({ nullable: true })
	desc?: string;
}

export type SourceData = {
	sourceId: string;
	companyId: string | Company;
	reinvest?: false | ReInvestPolicyData,
	title?: string;
	login?: string;
	link?: string;
	desc?: string;
};

export type ReInvestPolicyData = {
	productId?: string | Product,
	minInterval: number,
	minCount: number,
};

export interface ReInvestPolicy extends ReInvestPolicyData {
	productId?: string,
}
