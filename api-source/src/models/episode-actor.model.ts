import {Entity, model, property} from '@loopback/repository';

@model()
export class EpisodeActor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  episodeId?: number;

  @property({
    type: 'number',
  })
  actorId?: number;

  constructor(data?: Partial<EpisodeActor>) {
    super(data);
  }
}

export interface EpisodeActorRelations {
  // describe navigational properties here
}

export type EpisodeActorWithRelations = EpisodeActor & EpisodeActorRelations;
