import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Company implements CompanyData {
	@PrimaryColumn()
	companyId: string;

	@Column()
	title: string;

	@Column({ nullable: true })
	link?: string;

	@Column({ nullable: true })
	desc?: string;
}

export type CompanyData = {
	companyId: string;
	title: string;
	link?: string;
	desc?: string;
};
