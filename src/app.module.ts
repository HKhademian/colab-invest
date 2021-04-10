import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AccountModule } from './account/account.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { SystemModule } from './system/system.module';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { RouterModule, Routes } from 'nest-router';


@Module({
	imports: [
		RouterModule.forRoutes([{
			path: '/admin', module: SystemModule,
		}]),

		TypeOrmModule.forRoot({
			type: 'sqljs',
			location: __dirname + '/../data/database.db',
			autoSave: true,
			entities: [
				__dirname + '/**/*.entity{.ts,.js}',
			],
			synchronize: true,
		}),

		AuthModule, AccountModule, SystemModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{ provide: APP_GUARD, useClass: RolesGuard },
	],
})
export class AppModule {
}
