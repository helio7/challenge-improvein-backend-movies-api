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
import {Director} from '../models';
import {DirectorRepository} from '../repositories';

export class DirectorController {
  constructor(
    @repository(DirectorRepository)
    public directorRepository : DirectorRepository,
  ) {}

  @post('/directors')
  @response(200, {
    description: 'Director model instance',
    content: {'application/json': {schema: getModelSchemaRef(Director)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Director, {
            title: 'NewDirector',
            exclude: ['id'],
          }),
        },
      },
    })
    director: Omit<Director, 'id'>,
  ): Promise<Director> {
    return this.directorRepository.create(director);
  }

  @get('/directors/count')
  @response(200, {
    description: 'Director model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Director) where?: Where<Director>,
  ): Promise<Count> {
    return this.directorRepository.count(where);
  }

  @get('/directors')
  @response(200, {
    description: 'Array of Director model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Director, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Director) filter?: Filter<Director>,
  ): Promise<Director[]> {
    return this.directorRepository.find(filter);
  }

  @patch('/directors')
  @response(200, {
    description: 'Director PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Director, {partial: true}),
        },
      },
    })
    director: Director,
    @param.where(Director) where?: Where<Director>,
  ): Promise<Count> {
    return this.directorRepository.updateAll(director, where);
  }

  @get('/directors/{id}')
  @response(200, {
    description: 'Director model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Director, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Director, {exclude: 'where'}) filter?: FilterExcludingWhere<Director>
  ): Promise<Director> {
    return this.directorRepository.findById(id, filter);
  }

  @patch('/directors/{id}')
  @response(204, {
    description: 'Director PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Director, {partial: true}),
        },
      },
    })
    director: Director,
  ): Promise<void> {
    await this.directorRepository.updateById(id, director);
  }

  @put('/directors/{id}')
  @response(204, {
    description: 'Director PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() director: Director,
  ): Promise<void> {
    await this.directorRepository.replaceById(id, director);
  }

  @del('/directors/{id}')
  @response(204, {
    description: 'Director DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.directorRepository.deleteById(id);
  }
}
