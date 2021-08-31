import {Entity, model, property, hasMany} from '@loopback/repository';
import {Movie} from './movie.model';
import {TvShow} from './tv-show.model';
import {Episode} from './episode.model';

@model()
export class Director extends Entity {
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

  @hasMany(() => Movie)
  movies: Movie[];

  @hasMany(() => TvShow)
  tvShows: TvShow[];

  @hasMany(() => Episode)
  episodes: Episode[];

  constructor(data?: Partial<Director>) {
    super(data);
  }
}

export interface DirectorRelations {
  // describe navigational properties here
}

export type DirectorWithRelations = Director & DirectorRelations;
