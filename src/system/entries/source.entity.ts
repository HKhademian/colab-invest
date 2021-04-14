import { Column, DeepPartial, Entity, OneToMany } from 'typeorm';
import { Company, CompanyData } from './company.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { ReInvestPolicy, ReInvestPolicyData } from '../structs/reInvestPolicy.data';
import { BaseEntity, BaseEntityData } from './_base.entity';

@ObjectType()
@Entity()
export class Source extends BaseEntity implements SourceData {
	@Field()
	@OneToMany(_ => Company, company => company._id)
	@Column()
	readonly companyId: string;

	@Field()
	@Column('simple-json', { nullable: true })
	reinvest?: ReInvestPolicy;

	@Field({ nullable: true })
	@Column({ nullable: true })
	title?: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	login?: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	link?: string;

	private constructor() {
		super();
	}

	static from(data?: DeepPartial<SourceData>, base?: Source): Source {
		return Object.assign(BaseEntity.assign(new Source(), data, base), {
			companyId: Company.getId(data?.companyId, base?.companyId),
			reinvest: data?.reinvest == null ? undefined : ReInvestPolicy.from(data?.reinvest, base?.reinvest),
			title: data?.title == null ? undefined : data?.title || base?.title || 'new source',
			login: data?.login == null ? undefined : data?.login || base?.login || undefined,
			link: data?.link == null ? undefined : data?.link || base?.link || undefined,
		} as Source);
	};
}

export type SourceData = BaseEntityData & {
	companyId: string | CompanyData;
	reinvest?: null | ReInvestPolicyData,
	title?: null | string;
	login?: null | string;
	link?: null | string;
};
