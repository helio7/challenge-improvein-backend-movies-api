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
  Director,
} from '../models';
import {EpisodeRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate({strategy: 'auth0-jwt'})
export class EpisodeDirectorController {
  constructor(
    @repository(EpisodeRepository)
    public episodeRepository: EpisodeRepository,
  ) { }

  @get('/episodes/{id}/director', {
    responses: {
      '200': {
        description: 'Director belonging to Episode',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Director)},
          },
        },
      },
    },
  })
  async getDirector(
    @param.path.number('id') id: typeof Episode.prototype.id,
  ): Promise<Director> {
    return this.episodeRepository.director(id);
  }
}
