import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemService } from './system.service';
import controllers from './controllers/_.controller';
import services from './services/_.service';
import entities from './entities/_.entity';
import resolvers from './resolvers/_.resolver';

@Module({
	imports: [TypeOrmModule.forFeature(entities)],
	exports: [TypeOrmModule, ...services],
	providers: [SystemService, ...services, ...resolvers],
	controllers: [...controllers],
})
export class SystemModule {
}
