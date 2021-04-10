import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WalletService } from '../services/wallet.service';
import { CreateWalletDto, UpdateWalletDto } from '../dto/wallet.dto';

@Controller('/wallet')
export class WalletController {
	constructor(private readonly walletService: WalletService) {
	}

	@Post()
	create(@Body() dto: CreateWalletDto) {
		return this.walletService.create(dto);
	}

	@Get()
	findAll() {
		return this.walletService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.walletService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() dto: UpdateWalletDto) {
		return this.walletService.update(id, dto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.walletService.remove(id);
	}
}
