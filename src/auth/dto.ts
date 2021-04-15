import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { Column } from 'typeorm';
import {
	IsEmail, IsNotEmpty, MinLength,
} from 'class-validator';

@ObjectType()
export class LoginResult implements LoginResultData {
	@Field() @Column()
	readonly access_token: string;
}

export type LoginResultData = {
	readonly access_token: string;
}

@ArgsType()
export class RegisterDto {

	@IsNotEmpty()
	@Field()
	@Column()
	name: string;

	@IsEmail()
	@Field()
	@Column()
	email: string;

	@IsNotEmpty()
	@Field()
	@Column()
	phone: string;

	@MinLength(8)
	@Field()
	@Column()
	password: string;
}

@ArgsType()
export class LoginDto {
	@IsNotEmpty()
	@Field()
	@Column()
	email_phone?: string;

	@IsNotEmpty()
	@Field()
	@Column()
	password: string;
}

@ArgsType()
export class VerifyDto {
	@IsNotEmpty()
	@Field()
	@Column()
	username?: string;

	@MinLength(8)
	@Field()
	@Column()
	password: string;
}
