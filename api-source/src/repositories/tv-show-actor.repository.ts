import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {TvShowActor, TvShowActorRelations} from '../models';

export class TvShowActorRepository extends DefaultCrudRepository<
  TvShowActor,
  typeof TvShowActor.prototype.id,
  TvShowActorRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TvShowActor, dataSource);
  }
}
