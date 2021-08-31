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
Movie,
MovieActor,
Actor,
} from '../models';
import {MovieRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate({strategy: 'auth0-jwt'})
export class MovieActorController {
  constructor(
    @repository(MovieRepository) protected movieRepository: MovieRepository,
  ) { }

  @get('/movies/{id}/actors', {
    responses: {
      '200': {
        description: 'Array of Movie has many Actor through MovieActor',
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
    return this.movieRepository.actors(id).find(filter);
  }

  @post('/movies/{id}/actors', {
    responses: {
      '200': {
        description: 'create a Actor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Actor)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Movie.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Actor, {
            title: 'NewActorInMovie',
            exclude: ['id'],
          }),
        },
      },
    }) actor: Omit<Actor, 'id'>,
  ): Promise<Actor> {
    return this.movieRepository.actors(id).create(actor);
  }

  @patch('/movies/{id}/actors', {
    responses: {
      '200': {
        description: 'Movie.Actor PATCH success count',
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
    return this.movieRepository.actors(id).patch(actor, where);
  }

  @del('/movies/{id}/actors', {
    responses: {
      '200': {
        description: 'Movie.Actor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Actor)) where?: Where<Actor>,
  ): Promise<Count> {
    return this.movieRepository.actors(id).delete(where);
  }
}
