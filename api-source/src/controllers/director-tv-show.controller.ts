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
  TvShow,
} from '../models';
import {DirectorRepository} from '../repositories';

export class DirectorTvShowController {
  constructor(
    @repository(DirectorRepository) protected directorRepository: DirectorRepository,
  ) { }

  @get('/directors/{id}/tv-shows', {
    responses: {
      '200': {
        description: 'Array of Director has many TvShow',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TvShow)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TvShow>,
  ): Promise<TvShow[]> {
    return this.directorRepository.tvShows(id).find(filter);
  }

  @post('/directors/{id}/tv-shows', {
    responses: {
      '200': {
        description: 'Director model instance',
        content: {'application/json': {schema: getModelSchemaRef(TvShow)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Director.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TvShow, {
            title: 'NewTvShowInDirector',
            exclude: ['id'],
            optional: ['directorId']
          }),
        },
      },
    }) tvShow: Omit<TvShow, 'id'>,
  ): Promise<TvShow> {
    return this.directorRepository.tvShows(id).create(tvShow);
  }

  @patch('/directors/{id}/tv-shows', {
    responses: {
      '200': {
        description: 'Director.TvShow PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TvShow, {partial: true}),
        },
      },
    })
    tvShow: Partial<TvShow>,
    @param.query.object('where', getWhereSchemaFor(TvShow)) where?: Where<TvShow>,
  ): Promise<Count> {
    return this.directorRepository.tvShows(id).patch(tvShow, where);
  }

  @del('/directors/{id}/tv-shows', {
    responses: {
      '200': {
        description: 'Director.TvShow DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TvShow)) where?: Where<TvShow>,
  ): Promise<Count> {
    return this.directorRepository.tvShows(id).delete(where);
  }
}
