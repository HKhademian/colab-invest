import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { CreateCompanyDto, UpdateCompanyDto } from '../dto/company.dto';
import { Roles, UseRolesGuard } from '../../auth/roles.decorator';
import { Role } from '../../auth/role.enum';

@UseRolesGuard()
@Controller('/company')
export class CompanyController {
	constructor(private readonly companyService: CompanyService) {
	}

	@Roles(Role.Admin)
	@Post()
	create(@Body() dto: CreateCompanyDto) {
		return this.companyService.create(dto);
	}

	@Roles(Role.Admin)
	@Get()
	findAll() {
		return this.companyService.findAll();
	}

	@Roles(Role.Admin)
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.companyService.findOne(id);
	}

	@Roles(Role.Admin)
	@Patch(':id')
	update(@Param('id') id: string, @Body() dto: UpdateCompanyDto) {
		return this.companyService.update(id, dto);
	}

	@Roles(Role.Admin)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.companyService.remove(id);
	}
}
