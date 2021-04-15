import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { SystemModule } from './system/system.module';
import { RouterModule } from 'nest-router';
import { GqlModule } from './graphql/gql.module';
import { GraphQLModule } from '@nestjs/graphql';


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

		AuthModule, AccountModule, SystemModule, GqlModule,

		GraphQLModule.forRoot({
			autoSchemaFile: true,
			include: [GqlModule, AuthModule, AccountModule, SystemModule],
			sortSchema: true,
			buildSchemaOptions: {
				dateScalarMode: 'timestamp',
			},
		}),
	],
	controllers: [AppController],
	providers: [
		AppService,
		{ provide: APP_GUARD, useClass: RolesGuard },
	],
})
export class AppModule {
}
