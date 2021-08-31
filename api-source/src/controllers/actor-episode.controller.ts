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
Actor,
EpisodeActor,
Episode,
} from '../models';
import {ActorRepository} from '../repositories';

export class ActorEpisodeController {
  constructor(
    @repository(ActorRepository) protected actorRepository: ActorRepository,
  ) { }

  @get('/actors/{id}/episodes', {
    responses: {
      '200': {
        description: 'Array of Actor has many Episode through EpisodeActor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Episode)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Episode>,
  ): Promise<Episode[]> {
    return this.actorRepository.episodes(id).find(filter);
  }

  @post('/actors/{id}/episodes', {
    responses: {
      '200': {
        description: 'create a Episode model instance',
        content: {'application/json': {schema: getModelSchemaRef(Episode)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Actor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Episode, {
            title: 'NewEpisodeInActor',
            exclude: ['id'],
          }),
        },
      },
    }) episode: Omit<Episode, 'id'>,
  ): Promise<Episode> {
    return this.actorRepository.episodes(id).create(episode);
  }

  @patch('/actors/{id}/episodes', {
    responses: {
      '200': {
        description: 'Actor.Episode PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Episode, {partial: true}),
        },
      },
    })
    episode: Partial<Episode>,
    @param.query.object('where', getWhereSchemaFor(Episode)) where?: Where<Episode>,
  ): Promise<Count> {
    return this.actorRepository.episodes(id).patch(episode, where);
  }

  @del('/actors/{id}/episodes', {
    responses: {
      '200': {
        description: 'Actor.Episode DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Episode)) where?: Where<Episode>,
  ): Promise<Count> {
    return this.actorRepository.episodes(id).delete(where);
  }
}
