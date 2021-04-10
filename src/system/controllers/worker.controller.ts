import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkerService } from '../services/worker.service';
import { CreateWorkerDto, UpdateWorkerDto } from '../dto/worker.dto';

@Controller('/worker')
export class WorkerController {
	constructor(private readonly workerService: WorkerService) {
	}

	@Post()
	create(@Body() dto: CreateWorkerDto) {
		return this.workerService.create(dto);
	}

	@Get()
	findAll() {
		return this.workerService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.workerService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() dto: UpdateWorkerDto) {
		return this.workerService.update(id, dto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.workerService.remove(id);
	}
}
