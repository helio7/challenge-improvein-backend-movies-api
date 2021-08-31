import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Episode,
EpisodeActor,
Actor,
} from '../models';
import {EpisodeRepository} from '../repositories';

export class EpisodeActorController {
  constructor(
    @repository(EpisodeRepository) protected episodeRepository: EpisodeRepository,
  ) { }

  @get('/episodes/{id}/actors', {
    responses: {
      '200': {
        description: 'Array of Episode has many Actor through EpisodeActor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Actor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Actor>,
  ): Promise<Actor[]> {
    return this.episodeRepository.actors(id).find(filter);
  }

  @post('/episodes/{id}/actors', {
    responses: {
      '200': {
        description: 'create a Actor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Actor)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Episode.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Actor, {
            title: 'NewActorInEpisode',
            exclude: ['id'],
          }),
        },
      },
    }) actor: Omit<Actor, 'id'>,
  ): Promise<Actor> {
    return this.episodeRepository.actors(id).create(actor);
  }

  @patch('/episodes/{id}/actors', {
    responses: {
      '200': {
        description: 'Episode.Actor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Actor, {partial: true}),
        },
      },
    })
    actor: Partial<Actor>,
    @param.query.object('where', getWhereSchemaFor(Actor)) where?: Where<Actor>,
  ): Promise<Count> {
    return this.episodeRepository.actors(id).patch(actor, where);
  }

  @del('/episodes/{id}/actors', {
    responses: {
      '200': {
        description: 'Episode.Actor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Actor)) where?: Where<Actor>,
  ): Promise<Count> {
    return this.episodeRepository.actors(id).delete(where);
  }
}
