import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Movie, MovieRelations, Director, Actor, MovieActor} from '../models';
import {DirectorRepository} from './director.repository';
import {MovieActorRepository} from './movie-actor.repository';
import {ActorRepository} from './actor.repository';

export class MovieRepository extends DefaultCrudRepository<
  Movie,
  typeof Movie.prototype.id,
  MovieRelations
> {

  public readonly director: BelongsToAccessor<Director, typeof Movie.prototype.id>;

  public readonly actors: HasManyThroughRepositoryFactory<Actor, typeof Actor.prototype.id,
          MovieActor,
          typeof Movie.prototype.id
        >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('DirectorRepository') protected directorRepositoryGetter: Getter<DirectorRepository>, @repository.getter('MovieActorRepository') protected movieActorRepositoryGetter: Getter<MovieActorRepository>, @repository.getter('ActorRepository') protected actorRepositoryGetter: Getter<ActorRepository>,
  ) {
    super(Movie, dataSource);
    this.actors = this.createHasManyThroughRepositoryFactoryFor('actors', actorRepositoryGetter, movieActorRepositoryGetter,);
    this.registerInclusionResolver('actors', this.actors.inclusionResolver);
    this.director = this.createBelongsToAccessorFor('director', directorRepositoryGetter,);
    this.registerInclusionResolver('director', this.director.inclusionResolver);
  }
}
