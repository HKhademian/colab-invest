import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemService } from './system.service';
import { Coin } from './entries/coin.entity';
import { Company } from './entries/company.entity';
import { Product } from './entries/product.entity';
import { Source } from './entries/source.entity';
import { User } from './entries/user.entity';
import { Wallet } from './entries/wallet.entity';
import { CoinService } from './services/coin.service';
import { CompanyService } from './services/company.service';
import { ProductService } from './services/product.service';
import { SourceService } from './services/source.service';
import { UserService } from './services/user.service';
import { WalletService } from './services/wallet.service';
import { CoinController } from './controllers/coin.controller';
import { CompanyController } from './controllers/company.controller';
import { ProductController } from './controllers/product.controller';
import { SourceController } from './controllers/source.controller';
import { UserController } from './controllers/user.controller';
import { WalletController } from './controllers/wallet.controller';
import { WorkerService } from './services/worker.service';
import { WorkerController } from './controllers/worker.controller';
import { Worker } from './entries/worker.entity';
import { CoinResolver } from './resolvers/coin.resolver';
import { CompanyResolver } from './resolvers/company.resolver';

const entities = [Coin, Company, Product, Source, User, Wallet, Worker];
const services = [CoinService, CompanyService, ProductService, SourceService, UserService, WalletService, WorkerService];
const resolvers = [CoinResolver, CompanyResolver];
const controllers = [CoinController, CompanyController, ProductController, SourceController, UserController, WalletController, WorkerController];

@Module({
	imports: [TypeOrmModule.forFeature(entities)],
	exports: [TypeOrmModule, ...services],
	providers: [SystemService, ...services, ...resolvers],
	controllers: [...controllers],
})
export class SystemModule {
}
