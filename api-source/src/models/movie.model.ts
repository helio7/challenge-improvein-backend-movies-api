import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Director} from './director.model';
import {Actor} from './actor.model';
import {MovieActor} from './movie-actor.model';

@model()
export class Movie extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  score?: number;

  @belongsTo(() => Director)
  directorId: number;

  @hasMany(() => Actor, {through: {model: () => MovieActor}})
  actors: Actor[];

  constructor(data?: Partial<Movie>) {
    super(data);
  }
}

export interface MovieRelations {
  // describe navigational properties here
}

export type MovieWithRelations = Movie & MovieRelations;
