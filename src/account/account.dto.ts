import { IsEmail, IsOptional } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';
import { SharePolicyData } from '../system/structs/sharePolicy.data';
import { InvestPolicy } from '../system/structs/investPolicy.data';

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
