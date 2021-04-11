import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WalletService } from '../services/wallet.service';
import { CreateWalletDto, UpdateWalletDto } from '../dto/wallet.dto';
import { Roles, UseRolesGuard } from '../../auth/roles.decorator';
import { Role } from '../../auth/role.enum';

@UseRolesGuard()
@Controller('/wallet')
export class WalletController {
	constructor(private readonly walletService: WalletService) {
	}

	@Roles(Role.Admin)
	@Post()
	create(@Body() dto: CreateWalletDto) {
		return this.walletService.create(dto);
	}

	@Roles(Role.Admin)
	@Get()
	findAll() {
		return this.walletService.findAll();
	}

	@Roles(Role.Admin)
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.walletService.findOne(id);
	}

	@Roles(Role.Admin)
	@Patch(':id')
	update(@Param('id') id: string, @Body() dto: UpdateWalletDto) {
		return this.walletService.update(id, dto);
	}

	@Roles(Role.Admin)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.walletService.remove(id);
	}
}
