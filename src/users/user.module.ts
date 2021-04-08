import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	exports: [TypeOrmModule, UsersService],
	providers: [UsersService],
})
export class UsersModule {
}