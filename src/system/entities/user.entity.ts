import { Entity, Column, DeepPartial } from 'typeorm';
import { IsEmail } from 'class-validator';
import { AuthUtil } from '../../auth/auth.util';
import { Role } from '../../auth/role.enum';
import { Field, ObjectType } from '@nestjs/graphql';
import { SharePolicy, SharePolicyData } from '../structs/sharePolicy.data';
import { InvestPolicy } from '../structs/investPolicy.data';
import { UserStatics } from '../structs/userStatic.data';
import { BaseEntity, BaseEntityData } from './_base.entity';

@ObjectType()
@Entity()
export class User extends BaseEntity implements UserData {
	@Field()
	@Column()
	readonly role: Role;

	@Field({ nullable: true })
	@Column({ nullable: true })
	authId: string;

	@Field()
	@Column({ length: 25 })
	name: string;

	@Field()
	@Column({ length: 25 })
	title: string;

	@IsEmail()
	@Field()
	@Column()
	email: string;

	@Field()
	@Column()
	phone: string;

	@Field()
	@Column()
	password: string;

	@Field({ nullable: true })
	@Column('simple-json', { nullable: true })
	managerShare?: SharePolicy;

	@Field({ nullable: true })
	@Column('simple-json', { nullable: true })
	charityShare?: SharePolicy;

	@Field(_ => [SharePolicy])
	@Column('simple-json')
	agentsShare: Array<SharePolicy>;

	@Field(_ => [SharePolicy])
	@Column('simple-json')
	invest: Array<InvestPolicy>;

	@Field()
	@Column('simple-json')
	statics: UserStatics;

	private constructor() {
		super();
	}

	static from(data?: DeepPartial<UserData>, base?: User): User {
		return Object.assign(BaseEntity.assign(new User(), data, base), {
			role: data?.role || base?.role || 'user',
			authId: data?.authId || base?.authId || undefined,
			name: data?.name || base?.name || undefined,
			title: data?.title || base?.title || undefined,
			email: data?.email || base?.email || undefined,
			phone: data?.phone || base?.phone || undefined,
			password: data?.password || base?.password || undefined,
			managerShare: SharePolicy.from(data?.managerShare, base?.managerShare),
			charityShare: SharePolicy.from(data?.charityShare, base?.charityShare),
			agentsShare: SharePolicy.createList(data?.agentsShare, base?.agentsShare),
			invest: InvestPolicy.fromList(data?.invest, base?.invest),
			statics: UserStatics.from(data?.statics, base?.statics),
		} as User);
	}

	async setPassword(password: string) {
		this.password = await AuthUtil.hashPassword(password);
	}

	checkPassword(password: string): Promise<boolean> {
		return AuthUtil.checkPassword(password, this.password);
	}


}

export type UserData = BaseEntityData & {
	role: Role;
	authId: string;

	name: string;
	title: string;

	email: string;
	phone: string;
	password: string;

	managerShare?: null | SharePolicyData;
	charityShare?: null | SharePolicyData;
	agentsShare: null | SharePolicyData | SharePolicyData[];

	invest: number | InvestPolicy | InvestPolicy[];

	statics: null | UserStatics;
};
