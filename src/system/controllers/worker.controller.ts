import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkerService } from '../services/worker.service';
import { CreateWorkerDto, UpdateWorkerDto } from '../dto/worker.dto';
import { Roles, UseRolesGuard } from '../../auth/roles.decorator';
import { Role } from '../../auth/role.enum';

@UseRolesGuard()
@Controller('/worker')
export class WorkerController {
	constructor(private readonly workerService: WorkerService) {
	}

	@Roles(Role.Admin)
	@Post()
	create(@Body() dto: CreateWorkerDto) {
		return this.workerService.create(dto);
	}

	@Roles(Role.Admin)
	@Get()
	findAll() {
		return this.workerService.findAll();
	}

	@Roles(Role.Admin)
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.workerService.findOne(id);
	}

	@Roles(Role.Admin)
	@Patch(':id')
	update(@Param('id') id: string, @Body() dto: UpdateWorkerDto) {
		return this.workerService.update(id, dto);
	}

	@Roles(Role.Admin)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.workerService.remove(id);
	}
}
