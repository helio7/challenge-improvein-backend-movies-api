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
  Episode,
} from '../models';
import {TvShowRepository} from '../repositories';

export class TvShowEpisodeController {
  constructor(
    @repository(TvShowRepository) protected tvShowRepository: TvShowRepository,
  ) { }

  @get('/tv-shows/{id}/episodes', {
    responses: {
      '200': {
        description: 'Array of TvShow has many Episode',
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
    return this.tvShowRepository.episodes(id).find(filter);
  }

  @post('/tv-shows/{id}/episodes', {
    responses: {
      '200': {
        description: 'TvShow model instance',
        content: {'application/json': {schema: getModelSchemaRef(Episode)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TvShow.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Episode, {
            title: 'NewEpisodeInTvShow',
            exclude: ['id'],
            optional: ['tvShowId']
          }),
        },
      },
    }) episode: Omit<Episode, 'id'>,
  ): Promise<Episode> {
    return this.tvShowRepository.episodes(id).create(episode);
  }

  @patch('/tv-shows/{id}/episodes', {
    responses: {
      '200': {
        description: 'TvShow.Episode PATCH success count',
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
    return this.tvShowRepository.episodes(id).patch(episode, where);
  }

  @del('/tv-shows/{id}/episodes', {
    responses: {
      '200': {
        description: 'TvShow.Episode DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Episode)) where?: Where<Episode>,
  ): Promise<Count> {
    return this.tvShowRepository.episodes(id).delete(where);
  }
}
