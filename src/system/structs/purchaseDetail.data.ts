import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, DeepPartial } from 'typeorm';
import { CompanyData } from '../entries/company.entity';
import { ProductData } from '../entries/product.entity';
import { PriceDetail, PriceDetailData } from './priceDetail.data';
import { BaseEntity, DateData } from '../entries/_base.entity';

@ObjectType()
export class PurchaseDetail implements PurchaseDetailData {
	@Field()
	@Column()
	type: 'buy' | 'reinvest';

	@Field()
	@Column()
	companyId: string;

	@Field()
	@Column()
	productId: string;

	@Field()
	@Column()
	factor: string;

	@Field()
	@Column()
	count: number;

	@Field(_ => PriceDetail)
	@Column('simple-json')
	price: PriceDetail;

	@Field()
	@Column()
	date: Date;

	@Field(_ => Int)
	@Column()
	life: number;

	@Field({ nullable: true })
	@Column({ nullable: true })
	desc?: string;

	private constructor() {
	}

	static from(data?: null | DeepPartial<PurchaseDetailData>, base?: PurchaseDetail): PurchaseDetail | undefined {
		if (data === null) return undefined;
		return Object.assign(new PurchaseDetail(), {
			type: data?.type || base?.type || undefined,
			companyId: BaseEntity.getId(data?.companyId, base?.companyId),
			productId: BaseEntity.getId(data?.productId, base?.productId),
			factor: data?.factor || base?.factor || undefined,
			count: data?.count || base?.count || 0,
			price: PriceDetail.from(data?.price, base?.price),
			date: BaseEntity.getDate(data?.date as DateData, base?.date),
			life: data?.life || base?.life || 0,
		} as PurchaseDetail);
	}
}

export type PurchaseDetailData = {
	type: 'buy' | 'reinvest';
	companyId: string | CompanyData;
	productId: string | ProductData;
	factor: string;
	count: number;
	price: PriceDetailData;
	date: DateData;
	life: number;
};
