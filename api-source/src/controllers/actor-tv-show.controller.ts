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
TvShowActor,
TvShow,
} from '../models';
import {ActorRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate({strategy: 'auth0-jwt'})
export class ActorTvShowController {
  constructor(
    @repository(ActorRepository) protected actorRepository: ActorRepository,
  ) { }

  @get('/actors/{id}/tv-shows', {
    responses: {
      '200': {
        description: 'Array of Actor has many TvShow through TvShowActor',
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
    return this.actorRepository.tvShows(id).find(filter);
  }

  @post('/actors/{id}/tv-shows', {
    responses: {
      '200': {
        description: 'create a TvShow model instance',
        content: {'application/json': {schema: getModelSchemaRef(TvShow)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Actor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TvShow, {
            title: 'NewTvShowInActor',
            exclude: ['id'],
          }),
        },
      },
    }) tvShow: Omit<TvShow, 'id'>,
  ): Promise<TvShow> {
    return this.actorRepository.tvShows(id).create(tvShow);
  }

  @patch('/actors/{id}/tv-shows', {
    responses: {
      '200': {
        description: 'Actor.TvShow PATCH success count',
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
    return this.actorRepository.tvShows(id).patch(tvShow, where);
  }

  @del('/actors/{id}/tv-shows', {
    responses: {
      '200': {
        description: 'Actor.TvShow DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TvShow)) where?: Where<TvShow>,
  ): Promise<Count> {
    return this.actorRepository.tvShows(id).delete(where);
  }
}
