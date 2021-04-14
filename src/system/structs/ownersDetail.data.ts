import { Field, ObjectType } from '@nestjs/graphql';
import { Column, DeepPartial } from 'typeorm';
import { User, UserData } from '../entries/user.entity';
import { BaseEntity } from '../entries/_base.entity';

@ObjectType()
export class Owner implements OwnerData {
	@Field()
	@Column()
	readonly userId: string;

	@Field()
	@Column()
	readonly value: number;

	private constructor() {
	}

	static from(data?: null | string | UserData | DeepPartial<OwnerData>, base?: Owner): Owner | undefined {
		if (data === null) return undefined;

		if (typeof data == 'string')
			return Object.assign(new Owner(), {
				userId: data, value: 1,
			} as Owner);

		if (data instanceof User || (data as UserData)?._id)
			return Object.assign(new Owner(), {
				userId: (data as UserData)._id, value: 1,
			} as Owner);

		if (data)
			return Object.assign(new Owner(), {
				userId: BaseEntity.getId((data as OwnerData).userId)!, value: (data as OwnerData).value,
			} as Owner);

		return base && Object.assign(new Owner(), {
			userId: base?.userId, value: base.value,
		} as Owner);
	}

	static fromList(data?: OwnersData, base?: Owner[]): Owner[] {
		if (data === null) return undefined;
		return data && (Array.isArray(data) ? data : [data]).map(it => Owner.from(it)).filter(it => !!it) ||
			base && (Array.isArray(base) ? base : [base]).map(it => Owner.from(undefined, it)).filter(it => !!it) ||
			[];
	}
}

export type OwnerData = {
	userId: string | UserData;
	value: number;
}

export type OwnersData = string | UserData | OwnerData[] | { [userId: string]: number };
