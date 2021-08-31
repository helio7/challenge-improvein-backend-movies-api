import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {MovieActors, MovieActorsRelations} from '../models';

export class MovieActorsRepository extends DefaultCrudRepository<
  MovieActors,
  typeof MovieActors.prototype.id,
  MovieActorsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(MovieActors, dataSource);
  }
}
