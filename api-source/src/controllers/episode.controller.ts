import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Episode} from '../models';
import {EpisodeRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate({strategy: 'auth0-jwt'})
export class EpisodeController {
  constructor(
    @repository(EpisodeRepository)
    public episodeRepository : EpisodeRepository,
  ) {}

  @post('/episodes')
  @response(200, {
    description: 'Episode model instance',
    content: {'application/json': {schema: getModelSchemaRef(Episode)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Episode, {
            title: 'NewEpisode',
            exclude: ['id'],
          }),
        },
      },
    })
    episode: Omit<Episode, 'id'>,
  ): Promise<Episode> {
    return this.episodeRepository.create(episode);
  }

  @get('/episodes/count')
  @response(200, {
    description: 'Episode model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Episode) where?: Where<Episode>,
  ): Promise<Count> {
    return this.episodeRepository.count(where);
  }

  @get('/episodes')
  @response(200, {
    description: 'Array of Episode model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Episode, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Episode) filter?: Filter<Episode>,
  ): Promise<Episode[]> {
    return this.episodeRepository.find(filter);
  }

  @patch('/episodes')
  @response(200, {
    description: 'Episode PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Episode, {partial: true}),
        },
      },
    })
    episode: Episode,
    @param.where(Episode) where?: Where<Episode>,
  ): Promise<Count> {
    return this.episodeRepository.updateAll(episode, where);
  }

  @get('/episodes/{id}')
  @response(200, {
    description: 'Episode model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Episode, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Episode, {exclude: 'where'}) filter?: FilterExcludingWhere<Episode>
  ): Promise<Episode> {
    return this.episodeRepository.findById(id, filter);
  }

  @patch('/episodes/{id}')
  @response(204, {
    description: 'Episode PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Episode, {partial: true}),
        },
      },
    })
    episode: Episode,
  ): Promise<void> {
    await this.episodeRepository.updateById(id, episode);
  }

  @put('/episodes/{id}')
  @response(204, {
    description: 'Episode PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() episode: Episode,
  ): Promise<void> {
    await this.episodeRepository.replaceById(id, episode);
  }

  @del('/episodes/{id}')
  @response(204, {
    description: 'Episode DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.episodeRepository.deleteById(id);
  }
}
