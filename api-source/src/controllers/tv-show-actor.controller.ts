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
TvShow,
TvShowActor,
Actor,
} from '../models';
import {TvShowRepository} from '../repositories';

export class TvShowActorController {
  constructor(
    @repository(TvShowRepository) protected tvShowRepository: TvShowRepository,
  ) { }

  @get('/tv-shows/{id}/actors', {
    responses: {
      '200': {
        description: 'Array of TvShow has many Actor through TvShowActor',
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
    return this.tvShowRepository.actors(id).find(filter);
  }

  @post('/tv-shows/{id}/actors', {
    responses: {
      '200': {
        description: 'create a Actor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Actor)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TvShow.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Actor, {
            title: 'NewActorInTvShow',
            exclude: ['id'],
          }),
        },
      },
    }) actor: Omit<Actor, 'id'>,
  ): Promise<Actor> {
    return this.tvShowRepository.actors(id).create(actor);
  }

  @patch('/tv-shows/{id}/actors', {
    responses: {
      '200': {
        description: 'TvShow.Actor PATCH success count',
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
    return this.tvShowRepository.actors(id).patch(actor, where);
  }

  @del('/tv-shows/{id}/actors', {
    responses: {
      '200': {
        description: 'TvShow.Actor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Actor)) where?: Where<Actor>,
  ): Promise<Count> {
    return this.tvShowRepository.actors(id).delete(where);
  }
}
