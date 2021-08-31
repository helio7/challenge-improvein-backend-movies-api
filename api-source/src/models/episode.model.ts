import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {TvShow} from './tv-show.model';
import {Director} from './director.model';
import {Actor} from './actor.model';
import {EpisodeActor} from './episode-actor.model';

@model()
export class Episode extends Entity {
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

  @property({
    type: 'number',
  })
  season: number;

  @belongsTo(() => TvShow)
  tvShowId: number;

  @belongsTo(() => Director)
  directorId: number;

  @hasMany(() => Actor, {through: {model: () => EpisodeActor}})
  actors: Actor[];

  constructor(data?: Partial<Episode>) {
    super(data);
  }
}

export interface EpisodeRelations {
  // describe navigational properties here
}

export type EpisodeWithRelations = Episode & EpisodeRelations;
