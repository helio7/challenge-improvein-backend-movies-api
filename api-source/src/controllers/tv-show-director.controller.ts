import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  TvShow,
  Director,
} from '../models';
import {TvShowRepository} from '../repositories';

export class TvShowDirectorController {
  constructor(
    @repository(TvShowRepository)
    public tvShowRepository: TvShowRepository,
  ) { }

  @get('/tv-shows/{id}/director', {
    responses: {
      '200': {
        description: 'Director belonging to TvShow',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Director)},
          },
        },
      },
    },
  })
  async getDirector(
    @param.path.number('id') id: typeof TvShow.prototype.id,
  ): Promise<Director> {
    return this.tvShowRepository.director(id);
  }
}
