import {
	IsEmail, IsNotEmpty, MinLength,
} from 'class-validator';

export class RegisterDto {
	@IsNotEmpty() name: string;

	@IsEmail() email: string;

	@IsNotEmpty() phone: string;

	@MinLength(8) password: string;
}

export class VerifyDto {
	@IsNotEmpty() username?: string;

	@MinLength(8) password: string;
}

