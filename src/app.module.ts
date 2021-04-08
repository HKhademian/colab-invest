import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';

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
	],
	controllers: [AppController, AuthController],
	providers: [AppService],
})
export class AppModule {
}
