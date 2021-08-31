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
  Movie,
} from '../models';
import {DirectorRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate({strategy: 'auth0-jwt'})
export class DirectorMovieController {
  constructor(
    @repository(DirectorRepository) protected directorRepository: DirectorRepository,
  ) { }

  @get('/directors/{id}/movies', {
    responses: {
      '200': {
        description: 'Array of Director has many Movie',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Movie)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Movie>,
  ): Promise<Movie[]> {
    return this.directorRepository.movies(id).find(filter);
  }

  @post('/directors/{id}/movies', {
    responses: {
      '200': {
        description: 'Director model instance',
        content: {'application/json': {schema: getModelSchemaRef(Movie)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Director.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movie, {
            title: 'NewMovieInDirector',
            exclude: ['id'],
            optional: ['directorId']
          }),
        },
      },
    }) movie: Omit<Movie, 'id'>,
  ): Promise<Movie> {
    return this.directorRepository.movies(id).create(movie);
  }

  @patch('/directors/{id}/movies', {
    responses: {
      '200': {
        description: 'Director.Movie PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movie, {partial: true}),
        },
      },
    })
    movie: Partial<Movie>,
    @param.query.object('where', getWhereSchemaFor(Movie)) where?: Where<Movie>,
  ): Promise<Count> {
    return this.directorRepository.movies(id).patch(movie, where);
  }

  @del('/directors/{id}/movies', {
    responses: {
      '200': {
        description: 'Director.Movie DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Movie)) where?: Where<Movie>,
  ): Promise<Count> {
    return this.directorRepository.movies(id).delete(where);
  }
}
