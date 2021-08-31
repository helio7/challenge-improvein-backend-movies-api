import {Entity, model, property} from '@loopback/repository';

@model()
export class TvShowActor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  tvShowId?: number;

  @property({
    type: 'number',
  })
  actorId?: number;

  constructor(data?: Partial<TvShowActor>) {
    super(data);
  }
}

export interface TvShowActorRelations {
  // describe navigational properties here
}

export type TvShowActorWithRelations = TvShowActor & TvShowActorRelations;
