import { Column, DeepPartial } from 'typeorm';

export class UserStatics {
	@Column() totalDispose: number;
	@Column() totalWithdraw: number;
	@Column() totalInvest: number;
	@Column() totalIncome: number;
	@Column() totalWorkers: number;

	constructor(data?: DeepPartial<UserStatics>, base?: UserStatics) {
		Object.assign(this, {
			totalDispose: data ? data.totalDispose : base ? base.totalDispose : 0,
			totalWithdraw: data ? data.totalWithdraw : base ? base.totalWithdraw : 0,
			totalInvest: data ? data.totalInvest : base ? base.totalInvest : 0,
			totalIncome: data ? data.totalIncome : base ? base.totalIncome : 0,
			totalWorkers: data ? data.totalWorkers : base ? base.totalWorkers : 0,
		} as UserStatics);
	}
}
