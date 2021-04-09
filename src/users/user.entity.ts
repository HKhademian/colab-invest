import { Entity, Column, PrimaryColumn, DeepPartial, Unique } from 'typeorm';
import { SharePolicy, SharePolicyData } from './sharePolicy.data';
import { InvestPolicy } from './investPolicy.data';
import { UserStatics } from './userStatic.data';
import { generateId } from '../util';
import { IsEmail } from 'class-validator';
import { AuthUtil } from '../auth/auth.util';
import { Role } from '../auth/role.enum';

@Entity()
export class User implements UserData {
	@PrimaryColumn()
	readonly userId: string;

	@Column()
	readonly role: Role;

	@Column({ nullable: true })
	authId: string;

	@Column({ length: 25 })
	name: string;

	@Column({ length: 25 })
	title: string;

	@Column()
	@IsEmail()
	email: string;

	@Column()
	phone: string;

	@Column()
	password: string;

	@Column('simple-json', { nullable: true })
	managerShare?: SharePolicy;

	@Column('simple-json', { nullable: true })
	charityShare?: SharePolicy;

	@Column('simple-json')
	agentsShare: Array<SharePolicy>;

	@Column('simple-json')
	invest: Array<InvestPolicy>;

	@Column('simple-json')
	statics: UserStatics;

	constructor(
		source?: DeepPartial<UserData>,
		base?: Partial<User>,
	) {
		Object.assign(this, {
			userId: source?.userId || generateId(),
			role: source?.role || base?.role || 'user',
			authId: source?.authId || base?.authId || undefined,
			name: source?.name || base?.name || undefined,
			title: source?.title || base?.title || undefined,
			email: source?.email || base?.email || undefined,
			phone: source?.phone || base?.phone || undefined,
			password: source?.password || base?.password || undefined,
			managerShare: source?.managerShare || base?.managerShare ? new SharePolicy(source?.managerShare, base?.managerShare) : undefined,
			charityShare: source?.charityShare || base?.charityShare ? new SharePolicy(source?.charityShare, base?.charityShare) : undefined,
			agentsShare: SharePolicy.createList(source?.agentsShare, base?.agentsShare),
			invest: InvestPolicy.createList(source?.invest, base?.invest),
			statics: new UserStatics(source?.statics, base?.statics),
		} as User);
	}

	async setPassword(password: string) {
		this.password = await AuthUtil.hashPassword(password);
	}

	checkPassword(password: string): Promise<boolean> {
		return AuthUtil.checkPassword(password, this.password);
	}


}

type UserData = {
	userId: string;
	role: Role;
	authId: string;

	name: string;
	title: string;

	email: string;
	phone: string;
	password: string;

	managerShare?: SharePolicyData;
	charityShare?: SharePolicyData;
	agentsShare: SharePolicyData | SharePolicyData[];

	invest: number | InvestPolicy | InvestPolicy[];

	statics: UserStatics;
};
