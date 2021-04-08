import { User } from './user.entity';
import { Column, DeepPartial } from 'typeorm';
import { errVal } from '../util';

export type SharePolicyData = {
	user: string | User;
	share: number;
};

export class SharePolicy implements SharePolicyData {
	@Column()
	readonly user: string;

	@Column()
	readonly share: number;

	constructor(data?: DeepPartial<SharePolicyData>, base?: SharePolicy) {
		const user = data?.user || base?.user || errVal('no user provided');
		Object.assign(this, {
			user: typeof user == 'string' ? user : user.userId,
			share: data?.share != undefined ? data.share : base?.share != undefined ? base.share : 0,
		} as SharePolicy);
	}

	static createList(data?: DeepPartial<SharePolicyData> | DeepPartial<SharePolicyData[]>, base?: SharePolicy | SharePolicy[]): SharePolicy[] {
		if (data) {
			return (Array.isArray(data) ? data : [data]).map(it => new SharePolicy(it));
		}
		if (base) {
			(Array.isArray(base) ? base : [base]).map(it => new SharePolicy(undefined, it));
		}
		return [];
	}
}

export const NO_SHARE = Object.freeze(new SharePolicy({
	user: 'null', share: 0,
}));
