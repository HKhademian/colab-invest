import { IsEmail, IsOptional } from 'class-validator';
import { SharePolicyData } from '../system/structs/sharePolicy.data';
import { InvestPolicy } from '../system/structs/investPolicy.data';

export class UpdateInfoDto {
	@IsOptional() name?: string;
	@IsOptional() title?: string;
}

export class UpdateUsernameDto {
	@IsOptional() @IsEmail() email?: string;
	@IsOptional() phone?: string;
}

export class UpdatePolicyDto {
	charityShare?: boolean | SharePolicyData;

	invest: number | InvestPolicy | InvestPolicy[];
}
