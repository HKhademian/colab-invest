import { Column, DeepPartial } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InvestPolicy implements InvestPolicyData {
	@Field(_ => Int)
	@Column()
	readonly startTime: number;

	@Field(_ => Int)
	@Column()
	readonly endTime: number;

	@Field()
	@Column()
	readonly rate: number;

	private constructor() {
	}

	static from(data?: null | number | DeepPartial<InvestPolicyData>, base?: InvestPolicy): InvestPolicy | undefined {
		if (data === null) return undefined;
		return Object.assign(new InvestPolicy(), {
			startTime: typeof data == 'number' ? -1 : data ? data.startTime : base ? base.startTime : 0,
			endTime: typeof data == 'number' ? -1 : data ? data.endTime : base ? base.endTime : 0,
			rate: typeof data == 'number' ? data : data ? data.rate : base ? base.rate : 0,
		} as InvestPolicy);
	}

	static fromList(data?: null | number | DeepPartial<InvestPolicyData> | DeepPartial<InvestPolicyData[]>, base?: InvestPolicy[]): InvestPolicy[] | undefined {
		if (data === null) return undefined;

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
