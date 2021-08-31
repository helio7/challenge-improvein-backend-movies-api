import {Entity, model, property, hasMany} from '@loopback/repository';
import {Movie} from './movie.model';
import {MovieActor} from './movie-actor.model';
import {TvShow} from './tv-show.model';
import {TvShowActor} from './tv-show-actor.model';
import {Episode} from './episode.model';
import {EpisodeActor} from './episode-actor.model';

@model()
export class Actor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => Movie, {through: {model: () => MovieActor}})
  movies: Movie[];

  @hasMany(() => TvShow, {through: {model: () => TvShowActor}})
  tvShows: TvShow[];

  @hasMany(() => Episode, {through: {model: () => EpisodeActor}})
  episodes: Episode[];

  constructor(data?: Partial<Actor>) {
    super(data);
  }
}

export interface ActorRelations {
  // describe navigational properties here
}

export type ActorWithRelations = Actor & ActorRelations;
