import { Column, DeepPartial } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserStatics implements UserStaticsData {
	@Field()
	@Column()
	totalDispose: number;

	@Field()
	@Column()
	totalWithdraw: number;

	@Field()
	@Column()
	totalInvest: number;

	@Field()
	@Column()
	totalIncome: number;

	@Field()
	@Column()
	totalWorkers: number;

	private constructor() {
	}

	static from(data?: null | DeepPartial<UserStatics>, base?: UserStatics): UserStatics | undefined {
		if (data === null) return undefined;
		return Object.assign(new UserStatics(), {
			totalDispose: data ? data.totalDispose : base ? base.totalDispose : 0,
			totalWithdraw: data ? data.totalWithdraw : base ? base.totalWithdraw : 0,
			totalInvest: data ? data.totalInvest : base ? base.totalInvest : 0,
			totalIncome: data ? data.totalIncome : base ? base.totalIncome : 0,
			totalWorkers: data ? data.totalWorkers : base ? base.totalWorkers : 0,
		} as UserStatics);
	}
}

export type UserStaticsData = {
	totalDispose: number;
	totalWithdraw: number;
	totalInvest: number;
	totalIncome: number;
	totalWorkers: number;
};
