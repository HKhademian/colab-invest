import { Field, ObjectType } from '@nestjs/graphql';
import { Column, DeepPartial } from 'typeorm';
import { CompanyData } from '../entries/company.entity';
import { ProductData } from '../entries/product.entity';
import { PriceDetail, PriceDetailData } from './priceDetail.data';

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
	date: string;

	@Field()
	@Column()
	life: number;

	private constructor() {
	}

	static from(data?: DeepPartial<PurchaseDetailData>, base?: PurchaseDetail): PurchaseDetail {
		return undefined;
	}
}

export type PurchaseDetailData = {
	type: 'buy' | 'reinvest';
	companyId: string | CompanyData;
	productId: string | ProductData;
	factor: string;
	count: number;
	price: PriceDetailData;
	date: string;
	life: number;
};
