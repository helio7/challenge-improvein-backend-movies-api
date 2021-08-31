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
MovieActor,
Movie,
} from '../models';
import {ActorRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate({strategy: 'auth0-jwt'})
export class ActorMovieController {
  constructor(
    @repository(ActorRepository) protected actorRepository: ActorRepository,
  ) { }

  @get('/actors/{id}/movies', {
    responses: {
      '200': {
        description: 'Array of Actor has many Movie through MovieActor',
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
    return this.actorRepository.movies(id).find(filter);
  }

  @post('/actors/{id}/movies', {
    responses: {
      '200': {
        description: 'create a Movie model instance',
        content: {'application/json': {schema: getModelSchemaRef(Movie)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Actor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movie, {
            title: 'NewMovieInActor',
            exclude: ['id'],
          }),
        },
      },
    }) movie: Omit<Movie, 'id'>,
  ): Promise<Movie> {
    return this.actorRepository.movies(id).create(movie);
  }

  @patch('/actors/{id}/movies', {
    responses: {
      '200': {
        description: 'Actor.Movie PATCH success count',
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
    return this.actorRepository.movies(id).patch(movie, where);
  }

  @del('/actors/{id}/movies', {
    responses: {
      '200': {
        description: 'Actor.Movie DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Movie)) where?: Where<Movie>,
  ): Promise<Count> {
    return this.actorRepository.movies(id).delete(where);
  }
}
