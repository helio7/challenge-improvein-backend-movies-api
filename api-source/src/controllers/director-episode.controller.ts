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
  Director,
  Episode,
} from '../models';
import {DirectorRepository} from '../repositories';

export class DirectorEpisodeController {
  constructor(
    @repository(DirectorRepository) protected directorRepository: DirectorRepository,
  ) { }

  @get('/directors/{id}/episodes', {
    responses: {
      '200': {
        description: 'Array of Director has many Episode',
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
    return this.directorRepository.episodes(id).find(filter);
  }

  @post('/directors/{id}/episodes', {
    responses: {
      '200': {
        description: 'Director model instance',
        content: {'application/json': {schema: getModelSchemaRef(Episode)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Director.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Episode, {
            title: 'NewEpisodeInDirector',
            exclude: ['id'],
            optional: ['directorId']
          }),
        },
      },
    }) episode: Omit<Episode, 'id'>,
  ): Promise<Episode> {
    return this.directorRepository.episodes(id).create(episode);
  }

  @patch('/directors/{id}/episodes', {
    responses: {
      '200': {
        description: 'Director.Episode PATCH success count',
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
    return this.directorRepository.episodes(id).patch(episode, where);
  }

  @del('/directors/{id}/episodes', {
    responses: {
      '200': {
        description: 'Director.Episode DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Episode)) where?: Where<Episode>,
  ): Promise<Count> {
    return this.directorRepository.episodes(id).delete(where);
  }
}
