import { Field, ObjectType } from '@nestjs/graphql';
import { Column, DeepPartial } from 'typeorm';
import { ProductData } from '../entries/product.entity';
import { BaseEntity } from '../entries/_base.entity';

@ObjectType()
export class ReInvestPolicy implements ReInvestPolicyData {
	@Field({ nullable: true })
	@Column({ nullable: true })
	productId?: string;

	@Field()
	@Column()
	minInterval: number;

	@Field()
	@Column()
	minCount: number;

	private constructor() {
	}

	static from(data?: DeepPartial<ReInvestPolicyData>, base?: ReInvestPolicy): ReInvestPolicy {
		return Object.assign(new ReInvestPolicy(), {
			productId: BaseEntity.getId(data?.productId, base?.productId),
			minInterval: data?.minInterval === null ? 0 : data?.minInterval || base?.minInterval || 0,
			minCount: data?.minCount === null ? 0 : data?.minCount || base?.minCount || 0,
		});
	};
}

export type ReInvestPolicyData = {
	productId?: null | string | ProductData;
	minInterval: null | number;
	minCount: null | number;
};
