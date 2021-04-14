import { Column, DeepPartial } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InvestPolicy implements InvestPolicyData {
	@Field()
	@Column()
	readonly startTime: number;

	@Field()
	@Column()
	readonly endTime: number;

	@Field()
	@Column()
	readonly rate: number;

	private constructor() {
	}

	static from(data?: number | DeepPartial<InvestPolicyData>, base?: InvestPolicy): InvestPolicy {
		return Object.assign(new InvestPolicy(), {
			startTime: typeof data == 'number' ? -1 : data ? data.startTime : base ? base.startTime : 0,
			endTime: typeof data == 'number' ? -1 : data ? data.endTime : base ? base.endTime : 0,
			rate: typeof data == 'number' ? data : data ? data.rate : base ? base.rate : 0,
		} as InvestPolicy);
	}

	static fromList(data?: number | DeepPartial<InvestPolicyData> | DeepPartial<InvestPolicyData[]>, base?: InvestPolicy[]): InvestPolicy[] {
		if (data) {
			return (Array.isArray(data) ? data : [data]).map(it => InvestPolicy.from(it));
		}
		if (base) {
			return base.map(it => InvestPolicy.from(undefined, it));
		}
		return [];
	}

}

export type InvestPolicyData = {
	readonly startTime: number;
	readonly endTime: number;
	readonly rate: number;
};


export const NO_INVEST = Object.freeze(InvestPolicy.from({
	startTime: -1, endTime: -1, rate: 0,
}));
