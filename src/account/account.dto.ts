import { IsEmail, IsOptional } from 'class-validator';
import { SharePolicyData } from '../system/structs/sharePolicy.data';
import { InvestPolicy } from '../system/structs/investPolicy.data';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UpdateInfoDto {
	@IsOptional()
	@Field()
	name?: string;

	@IsOptional()
	@Field()
	title?: string;
}

@ArgsType()
export class UpdateUsernameDto {
	@IsOptional()
	@IsEmail()
	@Field()
	email?: string;

	@IsOptional()
	@Field()
	phone?: string;
}

@ArgsType()
export class UpdatePolicyDto {
	///@Field()
	charityShare?: boolean | SharePolicyData;

	//@Field()
	invest: number | InvestPolicy | InvestPolicy[];
}
