import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { Roles, UseRolesGuard } from '../../auth/roles.decorator';
import { Role } from '../../auth/role.enum';

@UseRolesGuard()
@Controller('/product')
export class ProductController {
	constructor(private readonly productService: ProductService) {
	}

	@Roles(Role.Admin)
	@Post()
	create(@Body() dto: CreateProductDto) {
		return this.productService.create(dto);
	}

	@Roles(Role.Admin)
	@Get()
	findAll() {
		return this.productService.findAll();
	}

	@Roles(Role.Admin)
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.productService.findOne(id);
	}

	@Roles(Role.Admin)
	@Patch(':id')
	update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
		return this.productService.update(id, dto);
	}

	@Roles(Role.Admin)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.productService.remove(id);
	}
}
