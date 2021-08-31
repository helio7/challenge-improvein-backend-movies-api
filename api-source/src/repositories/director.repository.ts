import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Director, DirectorRelations, Movie, TvShow, Episode} from '../models';
import {MovieRepository} from './movie.repository';
import {TvShowRepository} from './tv-show.repository';
import {EpisodeRepository} from './episode.repository';

export class DirectorRepository extends DefaultCrudRepository<
  Director,
  typeof Director.prototype.id,
  DirectorRelations
> {

  public readonly movies: HasManyRepositoryFactory<Movie, typeof Director.prototype.id>;

  public readonly tvShows: HasManyRepositoryFactory<TvShow, typeof Director.prototype.id>;

  public readonly episodes: HasManyRepositoryFactory<Episode, typeof Director.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('MovieRepository') protected movieRepositoryGetter: Getter<MovieRepository>, @repository.getter('TvShowRepository') protected tvShowRepositoryGetter: Getter<TvShowRepository>, @repository.getter('EpisodeRepository') protected episodeRepositoryGetter: Getter<EpisodeRepository>,
  ) {
    super(Director, dataSource);
    this.episodes = this.createHasManyRepositoryFactoryFor('episodes', episodeRepositoryGetter,);
    this.registerInclusionResolver('episodes', this.episodes.inclusionResolver);
    this.tvShows = this.createHasManyRepositoryFactoryFor('tvShows', tvShowRepositoryGetter,);
    this.registerInclusionResolver('tvShows', this.tvShows.inclusionResolver);
    this.movies = this.createHasManyRepositoryFactoryFor('movies', movieRepositoryGetter,);
    this.registerInclusionResolver('movies', this.movies.inclusionResolver);
  }
}
