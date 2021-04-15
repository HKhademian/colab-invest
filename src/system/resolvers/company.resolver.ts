import { Query, Args, Resolver, ID } from '@nestjs/graphql';
import { CompanyService } from '../services/company.service';
import { Company } from '../entries/company.entity';

@Resolver()
export class CompanyResolver {
	constructor(private readonly companyService: CompanyService) {
	}

	@Query(_ => Company)
	async coin(@Args('_id', { type: () => ID }) _id: string): Promise<Company | undefined> {
		return await this.companyService.findOne(_id);
	}

	@Query(_ => [Company])
	async coins(): Promise<Company[]> {
		return await this.companyService.findAll();
	}
}
