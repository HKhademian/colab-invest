import { Column, DeepPartial, PrimaryColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { generateId } from '../../util';

@ObjectType()
export class BaseEntity implements BaseEntityData {
	@Field(_ => ID)
	@PrimaryColumn()
	readonly _id: string = generateId();

	@Field({ nullable: true })
	@Column({ nullable: true })
	desc?: string;

	protected constructor() {
	}

	protected static assign<T extends BaseEntity, E extends BaseEntityData>(entity: T, data?: DeepPartial<E>, base?: T): T {
		return Object.assign(entity, {
			_id: BaseEntity.getId(data, base) || generateId(),
			desc: data?.desc === null ? undefined : data?.desc || base?.desc,
		} as T);
	}

	static getId(data?: null | string | DeepPartial<BaseEntityData>, base?: string | BaseEntity): string | undefined {
		return data === null ? undefined :
			(typeof data == 'string' ? data : data?._id) ||
			(typeof base == 'string' ? base : base?._id) ||
			undefined;
	}
}

export type BaseEntityData = {
	_id: string;
	desc?: null | string;
};
