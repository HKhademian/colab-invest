import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Roles, UseRolesGuard } from '../../auth/roles.decorator';
import { Role } from '../../auth/role.enum';

@UseRolesGuard()
@Controller()
export abstract class _CRUD_Controller {
	@Roles(Role.Admin)
	@Post()
	create(@Body() dto: unknown) {
		return undefined;
	}

	@Roles(Role.Admin)
	@Get()
	findAll() {
		return undefined;
	}

	@Roles(Role.Admin)
	@Get(':id')
	findOne(@Param('id') id: string) {
		return undefined;
	}

	@Roles(Role.Admin)
	@Patch(':id')
	update(@Param('id') id: string, @Body() dto: unknown) {
		return undefined;
	}

	@Roles(Role.Admin)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return undefined;
	}
}
