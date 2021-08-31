import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Episode,
  TvShow,
} from '../models';
import {EpisodeRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate({strategy: 'auth0-jwt'})
export class EpisodeTvShowController {
  constructor(
    @repository(EpisodeRepository)
    public episodeRepository: EpisodeRepository,
  ) { }

  @get('/episodes/{id}/tv-show', {
    responses: {
      '200': {
        description: 'TvShow belonging to Episode',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TvShow)},
          },
        },
      },
    },
  })
  async getTvShow(
    @param.path.number('id') id: typeof Episode.prototype.id,
  ): Promise<TvShow> {
    return this.episodeRepository.tvShow(id);
  }
}
