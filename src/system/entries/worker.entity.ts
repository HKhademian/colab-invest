import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Worker implements WorkerData {
	@PrimaryColumn()
	workerId: string;
}

export type WorkerData = {
	workerId: string;
};
