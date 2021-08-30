import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {JWTAuthenticationStrategy, KEY} from './authentication-strategies/';
import {
  AuthenticationComponent,
  registerAuthenticationStrategy
} from '@loopback/authentication';
import {JWTServiceProvider} from './authentication-strategies/jwt-service';

export {ApplicationConfig};

export class MoviesApiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Bind authentication component related elements
    this.component(AuthenticationComponent);
    this.service(JWTServiceProvider);

    // Register the Auth0 JWT authentication strategy
    registerAuthenticationStrategy(this, JWTAuthenticationStrategy);
    this.configure(KEY).to({
      jwksUri: process.env.AUTH0_DOMAIN + '.well-known/jwks.json',
      audience: process.env.AUTH0_AUDIENCE,
      issuer: process.env.AUTH0_DOMAIN,
      algorithms: ['RS256'],
    });

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
