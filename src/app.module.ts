import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AccountModule } from './account/account.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'sqljs',
			location: __dirname + '/../data/database.db',
			autoSave: true,
			entities: [
				__dirname + '/**/*.entity{.ts,.js}',
			],
			synchronize: true,
		}),
		UsersModule,
		AuthModule,
		AccountModule,
	],
	controllers: [AppController, AuthController],
	providers: [
		AppService,
		{ provide: APP_GUARD, useClass: RolesGuard },
	],
})
export class AppModule {
}
