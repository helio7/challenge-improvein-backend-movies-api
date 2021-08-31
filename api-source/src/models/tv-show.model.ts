import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Episode} from './episode.model';
import {Director} from './director.model';
import {Actor} from './actor.model';
import {TvShowActor} from './tv-show-actor.model';

@model()
export class TvShow extends Entity {
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

  @hasMany(() => Episode)
  episodes: Episode[];

  @belongsTo(() => Director)
  directorId: number;

  @hasMany(() => Actor, {through: {model: () => TvShowActor}})
  actors: Actor[];

  constructor(data?: Partial<TvShow>) {
    super(data);
  }
}

export interface TvShowRelations {
  // describe navigational properties here
}

export type TvShowWithRelations = TvShow & TvShowRelations;
