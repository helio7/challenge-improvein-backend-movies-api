# challenge-improvein-backend-movies-api
A REST HTTP API that provides information about movies.

Project requisites, and my solution choices:

- Functionality.
- Endpoints for authentication using JWT.
   - All the endpoints that deliver the data will require a Bearer token sent in the request.
   - There'll be a POST '/get-access-token' endpoint that will receive credentials, and will send back a temporal access token, and a refresh token.
- Also an endpoint for refreshing the JWT access token.
   - There'll be a POST '/refresh-access-token' endpoint that will receive an access token and a refresh token. If both of them are valid, the access token life will be extended.
- Endpoint for retrieving movies. It should be allowed to filter and sort by some field.
   - Get all movies with score = 3:
   GET {baseURL}/movies?filter={"where":{"score":3}}
   - Get all movies, sorted in descending order:
   GET {baseURL}/movies?filter={"order":"score DESC"}
- Endpoint for retrieving the information (director included) of a specific episode of a TV Show.
   - There'll be a GET '/tv-shows/{tv-show-id}/episodes' endpoint that will return information about the episodes of a TV show.
   - A filter can be applied to the GET request, to only get the information about an episode with an specific ID:
   http://localhost:3000/tv-shows/1/episodes?filter={"where":{"id":1}}
   - And the filter can also tell the server to retrieve information about the episode's director:
   http://localhost:3000/tv-shows/1/episodes?filter={"where":{"id":1},"include":["director"]}
- Endpoint for adding a new object (it could be for any entity you like).
   - '/movies' will allow you to add movies using POST requests.

- Model.
- Entities to consider:
- Movie. Has many actors, but one director.
   - Movie belongs to one director.
   - Movie has and belongs to many actors.
- TV Show. Has many actors, but one director. It also has seasons and episodes inside each of one.
   - Tv show has many episodes.
   - Tv show belongs to one director.
   - Tv show has and belongs to many actors.
- Actor. Can be on different movies and TV shows.
   - Actor has and belongs to many movies.
   - Actor has and belongs to many TV shows.
- Director. Can direct many movies and specific episodes of TV shows.
   - Director has many movies.
   - Director has many TV shows.
   - Director has many episodes.

- Tech Requirements.
- The code should be using Node.js 12 or superior.
   - No problem.
- The code could be written in Javascript or Typescript.
   - I'll use the Loopback.js 4 framework, that works exclusively with TypeScript.
- All the code and comments should be written in english.
   - No problem.
- Use a proper naming conventions and standards when defining the structure of the project and the name of variables, functions, etc.
   - camelCase for functions and variables.
   - /this-kind/of-notation for endpoints.
   - lowercase for database, tables and column names.
   - UPPERCASE for constants.
   - Single Capital Letter for models.
- The use of ESLint or other linter is optional.
   - There's not enough time to add this to the project. Also, there's only one developer working on this, and the complexity of the application is low. So it isn't necessary either.
- The database could be relational or NoSQL, it's up to you. The use of ORM is optional too.
   - I'll use a relational database, with PostgreSQL. Loopback.js 4 comes with its own ORM under the hood.
- The database doesn't need to be presented. But the model should be represented in some way. It could be in the form of ORM configuration or at least a minimal documentation or example of some of the entities.
   - Loopback generates .model files that define the models.

Final model relations structure:
- A movie
      - Belongs to one director.
      - Has and belongs to many actors.
- A TV show
      - Has many episodes.
      - Belongs to one director.
      - Has and belongs many actors.
- An episode
      - Belongs to a TV show.
      - Belongs to one director.
      - Has and belongs to many actors.
- A director
      - Has many movies.
      - Has many TV shows.
      - Has many episodes.
- An actor
      - Has and belongs to many movies.
      - Has and belongs to many TV shows.
      - Has and belongs to many episodes.
