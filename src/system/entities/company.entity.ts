import { Column, DeepPartial, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, BaseEntityData } from './_base.entity';

@ObjectType()
@Entity()
export class Company extends BaseEntity implements CompanyData {
	@Field()
	@Column()
	title: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	link?: string;

	private constructor() {
		super();
	}

	static from(data?: DeepPartial<CompanyData>, base?: Company): Company {
		return Object.assign(BaseEntity.assign(new Company(), data, base), {
			title: data?.title || base?.title || 'new company',
			link: data?.link === null ? undefined : data?.link || base?.link || undefined,
		} as Company);
	};
}

export type CompanyData = BaseEntityData & {
	title: string;
	link?: null | string;
};
