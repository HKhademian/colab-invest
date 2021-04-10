import { Injectable } from '@nestjs/common';
import { CreateCompanyDto, UpdateCompanyDto } from '../dto/company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coin } from '../entries/coin.entity';
import { Repository } from 'typeorm';
import { Company } from '../entries/company.entity';

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

	findAll() {
		return `This action returns all company`;
	}

	findOne(id: string) {
		return `This action returns a #${id} company`;
	}

	update(id: string, dto: UpdateCompanyDto) {
		return `This action updates a #${id} company`;
	}

	remove(id: string) {
		return `This action removes a #${id} company`;
	}
}
