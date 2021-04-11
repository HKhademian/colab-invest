import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CoinService } from '../services/coin.service';
import { CreateCoinDto, UpdateCoinDto } from '../dto/coin.dto';
import { Roles, UseRolesGuard } from '../../auth/roles.decorator';
import { Role } from '../../auth/role.enum';

@UseRolesGuard()
@Controller('/coin')
export class CoinController {
	constructor(private readonly coinService: CoinService) {
	}

	@Roles(Role.Admin)
	@Post()
	create(@Body() dto: CreateCoinDto) {
		return this.coinService.create(dto);
	}

	@Roles(Role.Admin)
	@Get()
	findAll() {
		return this.coinService.findAll();
	}

	@Roles(Role.Admin)
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.coinService.findOne(id);
	}

	@Roles(Role.Admin)
	@Patch(':id')
	update(@Param('id') id: string, @Body() dto: UpdateCoinDto) {
		return this.coinService.update(id, dto);
	}

	@Roles(Role.Admin)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.coinService.remove(id);
	}
}
