import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Episode, EpisodeRelations, TvShow, Director, Actor, EpisodeActor} from '../models';
import {TvShowRepository} from './tv-show.repository';
import {DirectorRepository} from './director.repository';
import {EpisodeActorRepository} from './episode-actor.repository';
import {ActorRepository} from './actor.repository';

export class EpisodeRepository extends DefaultCrudRepository<
  Episode,
  typeof Episode.prototype.id,
  EpisodeRelations
> {

  public readonly tvShow: BelongsToAccessor<TvShow, typeof Episode.prototype.id>;

  public readonly director: BelongsToAccessor<Director, typeof Episode.prototype.id>;

  public readonly actors: HasManyThroughRepositoryFactory<Actor, typeof Actor.prototype.id,
          EpisodeActor,
          typeof Episode.prototype.id
        >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TvShowRepository') protected tvShowRepositoryGetter: Getter<TvShowRepository>, @repository.getter('DirectorRepository') protected directorRepositoryGetter: Getter<DirectorRepository>, @repository.getter('EpisodeActorRepository') protected episodeActorRepositoryGetter: Getter<EpisodeActorRepository>, @repository.getter('ActorRepository') protected actorRepositoryGetter: Getter<ActorRepository>,
  ) {
    super(Episode, dataSource);
    this.actors = this.createHasManyThroughRepositoryFactoryFor('actors', actorRepositoryGetter, episodeActorRepositoryGetter,);
    this.registerInclusionResolver('actors', this.actors.inclusionResolver);
    this.director = this.createBelongsToAccessorFor('director', directorRepositoryGetter,);
    this.registerInclusionResolver('director', this.director.inclusionResolver);
    this.tvShow = this.createBelongsToAccessorFor('tvShow', tvShowRepositoryGetter,);
    this.registerInclusionResolver('tvShow', this.tvShow.inclusionResolver);
  }
}
