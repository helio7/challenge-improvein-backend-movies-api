import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Movie,
  Director,
} from '../models';
import {MovieRepository} from '../repositories';

export class MovieDirectorController {
  constructor(
    @repository(MovieRepository)
    public movieRepository: MovieRepository,
  ) { }

  @get('/movies/{id}/director', {
    responses: {
      '200': {
        description: 'Director belonging to Movie',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Director)},
          },
        },
      },
    },
  })
  async getDirector(
    @param.path.number('id') id: typeof Movie.prototype.id,
  ): Promise<Director> {
    return this.movieRepository.director(id);
  }
}
