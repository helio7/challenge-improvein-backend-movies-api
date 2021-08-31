import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {TvShow, TvShowRelations, Episode, Director, Actor, TvShowActor} from '../models';
import {EpisodeRepository} from './episode.repository';
import {DirectorRepository} from './director.repository';
import {TvShowActorRepository} from './tv-show-actor.repository';
import {ActorRepository} from './actor.repository';

export class TvShowRepository extends DefaultCrudRepository<
  TvShow,
  typeof TvShow.prototype.id,
  TvShowRelations
> {

  public readonly episodes: HasManyRepositoryFactory<Episode, typeof TvShow.prototype.id>;

  public readonly director: BelongsToAccessor<Director, typeof TvShow.prototype.id>;

  public readonly actors: HasManyThroughRepositoryFactory<Actor, typeof Actor.prototype.id,
          TvShowActor,
          typeof TvShow.prototype.id
        >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('EpisodeRepository') protected episodeRepositoryGetter: Getter<EpisodeRepository>, @repository.getter('DirectorRepository') protected directorRepositoryGetter: Getter<DirectorRepository>, @repository.getter('TvShowActorRepository') protected tvShowActorRepositoryGetter: Getter<TvShowActorRepository>, @repository.getter('ActorRepository') protected actorRepositoryGetter: Getter<ActorRepository>,
  ) {
    super(TvShow, dataSource);
    this.actors = this.createHasManyThroughRepositoryFactoryFor('actors', actorRepositoryGetter, tvShowActorRepositoryGetter,);
    this.registerInclusionResolver('actors', this.actors.inclusionResolver);
    this.director = this.createBelongsToAccessorFor('director', directorRepositoryGetter,);
    this.registerInclusionResolver('director', this.director.inclusionResolver);
    this.episodes = this.createHasManyRepositoryFactoryFor('episodes', episodeRepositoryGetter,);
    this.registerInclusionResolver('episodes', this.episodes.inclusionResolver);
  }
}
