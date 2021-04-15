import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from '../dto/company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';
import { UpdateCoinDto } from '../dto/coin.dto';

@Injectable()
export class CompanyService {
	constructor(
		@InjectRepository(Company)
		private companyRepo: Repository<Company>,
	) {
	}

	create(dto: CreateCompanyDto) {
		return 'This action adds a new company';
	}

	findAll(): Promise<Company[]> {
		return this.companyRepo.find();
	}

	findOne(_id: string): Promise<Company | undefined> {
		return this.companyRepo.findOne({ _id });
	}

	update(_id: string, dto: UpdateCoinDto): Promise<unknown> {
		return this.companyRepo.update(_id, dto);
	}

	remove(_id: string): Promise<unknown> {
		return this.companyRepo.delete({ _id });
	}
}
