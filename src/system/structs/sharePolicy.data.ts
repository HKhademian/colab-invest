import { Column, DeepPartial } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserData } from '../entries/user.entity';
import { BaseEntity } from '../entries/_base.entity';

@ObjectType()
export class SharePolicy implements SharePolicyData {
	@Field()
	@Column()
	readonly userId: string;

	@Field()
	@Column()
	readonly share: number;

	private constructor() {
	}

	static from(data?: DeepPartial<SharePolicyData>, base?: SharePolicy): SharePolicy {
		return Object.assign(new SharePolicy(), {
			userId: BaseEntity.getId(data?.userId, base?.userId),
			share: data?.share != undefined ? data.share : base?.share != undefined ? base.share : 0,
		} as SharePolicy);
	}

	static createList(data?: DeepPartial<SharePolicyData> | DeepPartial<SharePolicyData[]>, base?: SharePolicy | SharePolicy[]): SharePolicy[] {
		if (data) {
			return (Array.isArray(data) ? data : [data]).map(it => SharePolicy.from(it));
		}
		if (base) {
			(Array.isArray(base) ? base : [base]).map(it => SharePolicy.from(undefined, it));
		}
		return [];
	}
}

export type SharePolicyData = {
	userId: string | UserData;
	share: number;
};

export const NO_SHARE = Object.freeze(SharePolicy.from({
	userId: 'null', share: 0,
}));
