import {Entity, model, property} from '@loopback/repository';

@model()
export class MovieActor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  movieId?: number;

  @property({
    type: 'number',
  })
  actorId?: number;

  constructor(data?: Partial<MovieActor>) {
    super(data);
  }
}

export interface MovieActorRelations {
  // describe navigational properties here
}

export type MovieActorWithRelations = MovieActor & MovieActorRelations;
