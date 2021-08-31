import {
   post,
   requestBody,
} from '@loopback/rest';
import fetch from 'node-fetch';
import {authenticate} from '@loopback/authentication';

export class AuthenticationController {
   constructor() {}

   @post('/get-access-token')
   async getAccessToken(
      @requestBody()
      body: any,
   ): Promise<any> {
      return fetch(`${process.env.AUTH0_DOMAIN}oauth/token`, {
         method: 'POST',
         headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Accept: 'application/json'
         },
         body: encodeFormData({
            grant_type: 'password',
            username: body.email,
            password: body.password,
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_SECRET,
            audience: process.env.AUTH0_AUDIENCE,
            scope: ['offline_access'],
         })
      })
         .then(res => res.json())
   }

   @authenticate({strategy: 'auth0-jwt'})
   @post('/refresh-access-token')
   async refreshAccessToken(
      @requestBody()
      body: any,
   ): Promise<any> {
      return fetch(`${process.env.AUTH0_DOMAIN}oauth/token`, {
         method: 'POST',
         headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Accept: 'application/json'
         },
         body: encodeFormData({
            grant_type: 'refresh_token',
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_SECRET,
            refresh_token: body.refresh_token
         })
      })
         .then(res => res.json())
   }
}

// Helper function.
const encodeFormData = (data: any) => {
   return Object.keys(data)
      .map(
         (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
      )
   .join('&')
};

