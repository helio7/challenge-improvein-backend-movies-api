import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Actor, ActorRelations, Movie, MovieActor, TvShow, TvShowActor, Episode, EpisodeActor} from '../models';
import {MovieActorRepository} from './movie-actor.repository';
import {MovieRepository} from './movie.repository';
import {TvShowActorRepository} from './tv-show-actor.repository';
import {TvShowRepository} from './tv-show.repository';
import {EpisodeActorRepository} from './episode-actor.repository';
import {EpisodeRepository} from './episode.repository';

export class ActorRepository extends DefaultCrudRepository<
  Actor,
  typeof Actor.prototype.id,
  ActorRelations
> {

  public readonly movies: HasManyThroughRepositoryFactory<Movie, typeof Movie.prototype.id,
          MovieActor,
          typeof Actor.prototype.id
        >;

  public readonly tvShows: HasManyThroughRepositoryFactory<TvShow, typeof TvShow.prototype.id,
          TvShowActor,
          typeof Actor.prototype.id
        >;

  public readonly episodes: HasManyThroughRepositoryFactory<Episode, typeof Episode.prototype.id,
          EpisodeActor,
          typeof Actor.prototype.id
        >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('MovieActorRepository') protected movieActorRepositoryGetter: Getter<MovieActorRepository>, @repository.getter('MovieRepository') protected movieRepositoryGetter: Getter<MovieRepository>, @repository.getter('TvShowActorRepository') protected tvShowActorRepositoryGetter: Getter<TvShowActorRepository>, @repository.getter('TvShowRepository') protected tvShowRepositoryGetter: Getter<TvShowRepository>, @repository.getter('EpisodeActorRepository') protected episodeActorRepositoryGetter: Getter<EpisodeActorRepository>, @repository.getter('EpisodeRepository') protected episodeRepositoryGetter: Getter<EpisodeRepository>,
  ) {
    super(Actor, dataSource);
    this.episodes = this.createHasManyThroughRepositoryFactoryFor('episodes', episodeRepositoryGetter, episodeActorRepositoryGetter,);
    this.registerInclusionResolver('episodes', this.episodes.inclusionResolver);
    this.tvShows = this.createHasManyThroughRepositoryFactoryFor('tvShows', tvShowRepositoryGetter, tvShowActorRepositoryGetter,);
    this.registerInclusionResolver('tvShows', this.tvShows.inclusionResolver);
    this.movies = this.createHasManyThroughRepositoryFactoryFor('movies', movieRepositoryGetter, movieActorRepositoryGetter,);
    this.registerInclusionResolver('movies', this.movies.inclusionResolver);
  }
}
