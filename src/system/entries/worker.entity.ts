import { Column, DeepPartial, Entity, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Source, SourceData } from './source.entity';
import { Coin, CoinData } from './coin.entity';
import { Owner, OwnersData } from '../structs/ownersDetail.data';
import { PurchaseDetail, PurchaseDetailData } from '../structs/purchaseDetail.data';
import { BaseEntity, BaseEntityData } from './_base.entity';

@ObjectType()
@Entity()
export class Worker extends BaseEntity implements WorkerData {
	@Field()
	@OneToMany(_ => Source, source => source._id)
	@Column()
	readonly sourceId: string;

	@Field()
	@OneToMany(_ => Coin, coin => coin._id)
	@Column()
	readonly coinId: string;

	@Field()
	@Column()
	readonly power: number;

	@Field()
	@Column()
	readonly efficiency: number;

	@Field()
	@Column()
	readonly startTime: number;

	@Field()
	@Column()
	readonly endTime: number;

	@Field(_ => [Owner])
	@Column('simple-json')
	readonly owners: Array<Owner>;

	@Field()
	@Column('simple-json')
	readonly purchase: PurchaseDetail;

	private constructor() {
		super();
	}

	static from(data?: DeepPartial<WorkerData>, base?: Worker): Worker {
		return Object.assign(BaseEntity.assign(new Worker(), data, base), {
			sourceId: Source.getId(data?.sourceId, base?.sourceId),
			coinId: Coin.getId(data?.coinId, base?.coinId),
			power: data?.power || base?.power || 0,
			efficiency: data?.efficiency || base?.efficiency || 0,
			startTime: data?.startTime || base?.startTime || 0,
			owners: Owner.fromList(data?.owners as OwnersData, base?.owners),
			purchase: PurchaseDetail.from(data?.purchase, base?.purchase),
		} as Worker);
	};
}

export type WorkerData = BaseEntityData & {
	readonly sourceId: string | SourceData;
	readonly coinId: string | CoinData;
	readonly power: number;
	readonly efficiency: number;
	readonly startTime: number;
	readonly endTime: number;
	readonly owners: OwnersData;
	readonly purchase: PurchaseDetailData;
};
