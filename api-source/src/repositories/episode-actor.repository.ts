import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {EpisodeActor, EpisodeActorRelations} from '../models';

export class EpisodeActorRepository extends DefaultCrudRepository<
  EpisodeActor,
  typeof EpisodeActor.prototype.id,
  EpisodeActorRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(EpisodeActor, dataSource);
  }
}
