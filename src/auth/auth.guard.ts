import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
}

export const UseLocalAuthGuard = () => UseGuards(LocalAuthGuard);


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
}

export const UseJwtAuthGuard = () => UseGuards(JwtAuthGuard);
