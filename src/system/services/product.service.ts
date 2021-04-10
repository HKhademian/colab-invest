import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coin } from '../entries/coin.entity';
import { Repository } from 'typeorm';
import { Product } from '../entries/product.entity';

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(Product)
		private productRepo: Repository<Product>,
	) {
	}

	create(dto: CreateProductDto) {
		return 'This action adds a new product';
	}

	findAll() {
		return `This action returns all product`;
	}

	findOne(id: string) {
		return `This action returns a #${id} product`;
	}

	update(id: string, dto: UpdateProductDto) {
		return `This action updates a #${id} product`;
	}

	remove(id: string) {
		return `This action removes a #${id} product`;
	}
}
