import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SourceService } from '../services/source.service';
import { CreateSourceDto, UpdateSourceDto } from '../dto/source.dto';
import { Roles, UseRolesGuard } from '../../auth/roles.decorator';
import { Role } from '../../auth/role.enum';

@UseRolesGuard()
@Controller('/source')
export class SourceController {
	constructor(private readonly sourceService: SourceService) {
	}

	@Roles(Role.Admin)
	@Post()
	create(@Body() dto: CreateSourceDto) {
		return this.sourceService.create(dto);
	}

	@Roles(Role.Admin)
	@Get()
	findAll() {
		return this.sourceService.findAll();
	}

	@Roles(Role.Admin)
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.sourceService.findOne(id);
	}

	@Roles(Role.Admin)
	@Patch(':id')
	update(@Param('id') id: string, @Body() dto: UpdateSourceDto) {
		return this.sourceService.update(id, dto);
	}

	@Roles(Role.Admin)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.sourceService.remove(id);
	}
}
