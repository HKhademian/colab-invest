import { Field, ObjectType } from '@nestjs/graphql';
import { Column, DeepPartial } from 'typeorm';

@ObjectType()
export class PowerDetail implements PowerDetailData {
	@Field()
	@Column()
	profit: number;

	@Field()
	@Column()
	unit: string;

	private constructor() {
	}

	static from(data?: DeepPartial<PowerDetailData>, base?: PowerDetail): PowerDetail {
		return Object.assign(new PowerDetail(), {
			profit: data?.profit || base?.profit || 0,
			unit: data?.unit || base?.unit || '?/s',
		} as PowerDetail);
	};
}

export type PowerDetailData = {
	profit: number;
	unit: string;
};
