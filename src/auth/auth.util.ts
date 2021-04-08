import * as bcrypt from 'bcrypt';
import { parsePhoneNumber } from 'libphonenumber-js/mobile';

export module AuthUtil {
	export function hashPassword(password: string): Promise<string> {
		return bcrypt.hash(password, 10);
	}

	export function checkPassword(password: string, hash: string): Promise<boolean> {
		return bcrypt.compare(password, hash);
	}

	export const toPhone = (value: string): string => {
		if (!value) return undefined;
		const phoneNumber = parsePhoneNumber(value, 'IR');
		// console.log(phoneNumber.countryCallingCode, phoneNumber.nationalNumber, phoneNumber.formatInternational(), phoneNumber.number, phoneNumber.country, phoneNumber.getType());
		return (phoneNumber.country == 'IR') &&
			(phoneNumber.getType() == 'MOBILE') &&
			phoneNumber.number.toString();
	};

}
