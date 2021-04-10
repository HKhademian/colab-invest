import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SourceService } from '../services/source.service';
import { CreateSourceDto, UpdateSourceDto } from '../dto/source.dto';

@Controller('/source')
export class SourceController {
	constructor(private readonly sourceService: SourceService) {
	}

	@Post()
	create(@Body() dto: CreateSourceDto) {
		return this.sourceService.create(dto);
	}

	@Get()
	findAll() {
		return this.sourceService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.sourceService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() dto: UpdateSourceDto) {
		return this.sourceService.update(id, dto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.sourceService.remove(id);
	}
}
