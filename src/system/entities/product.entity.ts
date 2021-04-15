import { Column, DeepPartial, Entity, OneToMany } from 'typeorm';
import { Company, CompanyData } from './company.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PriceDetail, PriceDetailData } from '../structs/priceDetail.data';
import { MineDetail, MineDetailData } from '../structs/mineDetail.data';
import { BaseEntity, BaseEntityData } from './_base.entity';

@ObjectType()
@Entity()
export class Product extends BaseEntity implements ProductData {
	@Field()
	@OneToMany(_ => Company, company => company._id)
	@Column()
	readonly companyId: string;

	@Field(_ => Int)
	@Column()
	life: number;

	@Field()
	@Column('simple-json')
	price: PriceDetail;

	@Field()
	@Column('simple-json')
	mine: MineDetail;

	@Field()
	@Column()
	status: number;

	@Field({ nullable: true })
	@Column({ nullable: true })
	link?: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	desc?: string;

	private constructor() {
		super();
	}

	static from(data?: DeepPartial<ProductData>, base?: Product): Product {
		return Object.assign(BaseEntity.assign(new Product(), data, base), {
			companyId: Company.getId(data?.companyId, base?.companyId),
			life: data?.life || base?.life || 0,
			price: PriceDetail.from(data?.price, base?.price),
			mine: MineDetail.from(data?.mine, base?.mine),
			status: data?.status || base?.status || 0,
			link: data?.link === null ? undefined : data?.link || base?.link || undefined,
		} as Product);
	};
}

export type ProductData = BaseEntityData & {
	companyId: string | CompanyData;
	life: number;
	price: PriceDetailData;
	mine: MineDetailData;
	status: number;
	link?: null | string;
};
