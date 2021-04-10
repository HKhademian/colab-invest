import { Column, DeepPartial } from 'typeorm';

export class InvestPolicy {
	@Column() readonly startTime: number;
	@Column() readonly endTime: number;
	@Column() readonly rate: number;

	constructor(data?: number | DeepPartial<InvestPolicy>, base?: InvestPolicy) {
		Object.assign(this, {
			startTime: typeof data == 'number' ? -1 : data ? data.startTime : base ? base.startTime : 0,
			endTime: typeof data == 'number' ? -1 : data ? data.endTime : base ? base.endTime : 0,
			rate: typeof data == 'number' ? data : data ? data.rate : base ? base.rate : 0,
		} as InvestPolicy);
	}

	static createList(data?: number | DeepPartial<InvestPolicy> | DeepPartial<InvestPolicy[]>, base?: InvestPolicy | InvestPolicy[]): InvestPolicy[] {
		if (data) {
			return (Array.isArray(data) ? data : [data]).map(it => new InvestPolicy(it));
		}
		if (base) {
			(Array.isArray(base) ? base : [base]).map(it => new InvestPolicy(undefined, it));
		}
		return [];
	}

}

export const NO_INVEST = Object.freeze(new InvestPolicy({
	startTime: -1, endTime: -1, rate: 0,
}));
