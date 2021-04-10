import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { CreateCompanyDto, UpdateCompanyDto } from '../dto/company.dto';

@Controller('/company')
export class CompanyController {
	constructor(private readonly companyService: CompanyService) {
	}

	@Post()
	create(@Body() dto: CreateCompanyDto) {
		return this.companyService.create(dto);
	}

	@Get()
	findAll() {
		return this.companyService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.companyService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() dto: UpdateCompanyDto) {
		return this.companyService.update(id, dto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.companyService.remove(id);
	}
}
