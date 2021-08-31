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
import {TvShow} from '../models';
import {TvShowRepository} from '../repositories';

export class TvShowController {
  constructor(
    @repository(TvShowRepository)
    public tvShowRepository : TvShowRepository,
  ) {}

  @post('/tv-shows')
  @response(200, {
    description: 'TvShow model instance',
    content: {'application/json': {schema: getModelSchemaRef(TvShow)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TvShow, {
            title: 'NewTvShow',
            exclude: ['id'],
          }),
        },
      },
    })
    tvShow: Omit<TvShow, 'id'>,
  ): Promise<TvShow> {
    return this.tvShowRepository.create(tvShow);
  }

  @get('/tv-shows/count')
  @response(200, {
    description: 'TvShow model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TvShow) where?: Where<TvShow>,
  ): Promise<Count> {
    return this.tvShowRepository.count(where);
  }

  @get('/tv-shows')
  @response(200, {
    description: 'Array of TvShow model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TvShow, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TvShow) filter?: Filter<TvShow>,
  ): Promise<TvShow[]> {
    return this.tvShowRepository.find(filter);
  }

  @patch('/tv-shows')
  @response(200, {
    description: 'TvShow PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TvShow, {partial: true}),
        },
      },
    })
    tvShow: TvShow,
    @param.where(TvShow) where?: Where<TvShow>,
  ): Promise<Count> {
    return this.tvShowRepository.updateAll(tvShow, where);
  }

  @get('/tv-shows/{id}')
  @response(200, {
    description: 'TvShow model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TvShow, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TvShow, {exclude: 'where'}) filter?: FilterExcludingWhere<TvShow>
  ): Promise<TvShow> {
    return this.tvShowRepository.findById(id, filter);
  }

  @patch('/tv-shows/{id}')
  @response(204, {
    description: 'TvShow PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TvShow, {partial: true}),
        },
      },
    })
    tvShow: TvShow,
  ): Promise<void> {
    await this.tvShowRepository.updateById(id, tvShow);
  }

  @put('/tv-shows/{id}')
  @response(204, {
    description: 'TvShow PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tvShow: TvShow,
  ): Promise<void> {
    await this.tvShowRepository.replaceById(id, tvShow);
  }

  @del('/tv-shows/{id}')
  @response(204, {
    description: 'TvShow DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tvShowRepository.deleteById(id);
  }
}
