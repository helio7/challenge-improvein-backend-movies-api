const fetch = require('isomorphic-unfetch');

// This script shows you how to get an access token
// and how to use it to access the API resources.

// Run 'node index' in this directory after setting
// your credentials to execute the script.

// (ask Dylan for credentials)
const EMAIL = '';
const PASSWORD = '';
const API_BASE_URL = 'http://helio-movies-api-docker-3.us-east-2.elasticbeanstalk.com/';

(
   async () => {

      // Get access token.
      console.log('\nGetting access token...\n')
      const token = await fetch(`${API_BASE_URL}/get-access-token`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            email: EMAIL,
            password: PASSWORD
         }),
      })
         .then(res => res.json())
         .catch(err => console.log(err));
      console.log('Response:');
      console.log(`${JSON.stringify(token)}\n`);
      if (token.error) return;

      // Get a list of movies with score 3.
      console.log('Getting list of movies with score 3...\n')
      const response1 = await fetch(`${API_BASE_URL}/movies?filter=${
         JSON.stringify({
            where: {
               score: 3
            }
         })
      }`, {
         headers: {
            Authorization: `Bearer ${token.access_token}`
         }
      })
         .then(res => res.json())
         .catch(err => console.log(err));
      console.log('Response:')
      console.log(`${JSON.stringify(response1)}\n`);

      // Get all movies sorted by score in descending order.
      console.log('Getting all movies sorted by score in descending order...\n')
      const response2 = await fetch(`${API_BASE_URL}/movies?filter=${
         JSON.stringify({
            order: 'score DESC'
         })
      }`, {
         headers: {
            Authorization: `Bearer ${token.access_token}`
         }
      })
         .then(res => res.json())
         .catch(err => console.log(err));
      console.log('Response:')
      console.log(`${JSON.stringify(response2)}\n`);

      // Get "TV show 1" episodes.
      console.log('Getting "TV show 1" episodes...\n')
      const response3 = await fetch(`${API_BASE_URL}/tv-shows/1/episodes`, {
         headers: {
            Authorization: `Bearer ${token.access_token}`
         }
      })
         .then(res => res.json())
         .catch(err => console.log(err));
      console.log('Response:')
      console.log(`${JSON.stringify(response3)}\n`);

      // Add a new movie.
      console.log('Adding a new movie...\n')
      const response4 = await fetch(`${API_BASE_URL}/movies`, {
         method: 'POST',
         headers: {
            Authorization: `Bearer ${token.access_token}`,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            name: 'The Plague Dogs 2'
         }),
      })
         .then(res => res.json())
         .catch(err => console.log(err));
      console.log('Response:')
      console.log(`${JSON.stringify(response4)}\n`);

   }
)()
