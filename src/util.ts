import { nanoid } from 'nanoid';
import { HttpException, HttpStatus } from '@nestjs/common';

export const generateId = (size?: number) =>
	nanoid(size || 10);

export const errVal = (msg?: string): never => {
	throw Error(msg);
};

export const errHttp = (msg?: string, status?: number): never => {
	throw new HttpException(msg, status || HttpStatus.FORBIDDEN);
};
