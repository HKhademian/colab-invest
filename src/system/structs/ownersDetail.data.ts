import { Field, ObjectType } from '@nestjs/graphql';
import { Column } from 'typeorm';
import { UserData } from '../entries/user.entity';

@ObjectType()
export class Owner implements OwnerData {
	@Field()
	@Column()
	userId: string;

	@Field()
	@Column()
	value: number;

	private constructor() {
	}

	static from(data?: OwnersData, base?: Owner[]): Owner[] {
		return undefined;
	}
}

export type OwnerData = {
	userId: string;
	value: number;
}

export type OwnersData = string | UserData | OwnerData[] | { [userId: string]: number };
