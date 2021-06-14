import {create} from 'apisauce';
import apiMonitor from './Monitor';
import {Platform} from 'react-native';
import setInterceptor from './Interceptor';

const BASE_URL = 'https://dimandside.herokuapp.com/';
export const URIS = {
  MOVIES_LIST: '',
};

const createApiClient = (baseURL = BASE_URL) => {
  let api = create({
    baseURL,
    headers: {
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
    timeout: 30000,
  });

  // add monitor for logging api response
  __DEV__ && api.addMonitor(apiMonitor);
  setInterceptor(api);

  const moviesList = () => {
    console.log('called 2');
    return api.post(URIS.MOVIES_LIST, {
      query: `{
        allFilms {
          films {
            title
            releaseDate
            director
            episodeID
            characterConnection {
              characters {
                name
                birthYear
                eyeColor
                height
                homeworld {
                  id
                  name
                }
                gender
                mass
                skinColor
                species {
                  id
                  name
                }
              }
            }
          }
        }
      }`,
    });
  };

  //kickoff our api functions
  return {
    // client modifiers
    moviesList,
  };
};

export default {createApiClient};
