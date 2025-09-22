import { ApplicationConfig, provideZoneChangeDetection, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideApollo } from 'apollo-angular';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { InMemoryCache } from '@apollo/client/cache';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../environments/environment';
import { setContext } from '@apollo/client/link/context';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      const authLink = setContext((_, { headers }) => {
        return {
          headers: {
            ...headers,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        };
      });

      return {
        link: authLink.concat(httpLink.create({ uri: environment.graphqlApiUrl })),
        cache: new InMemoryCache(),
        defaultOptions: {
          watchQuery: {
            errorPolicy: 'all'
          }
        }
      };
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
