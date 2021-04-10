import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoinService } from '../services/coin.service';
import { CreateCoinDto, UpdateCoinDto } from '../dto/coin.dto';

@Controller('/coin')
export class CoinController {
	constructor(private readonly coinService: CoinService) {
	}

	@Post()
	create(@Body() dto: CreateCoinDto) {
		return this.coinService.create(dto);
	}

	@Get()
	findAll() {
		return this.coinService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.coinService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() dto: UpdateCoinDto) {
		return this.coinService.update(id, dto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.coinService.remove(id);
	}
}
