import { authorize } from 'react-native-app-auth';
import api from '../services/api';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL, AUTH_BASIC } from '@env';
interface IAccessToken {
  accessToken: string;
  expirationDate: string;
  refreshToken: string;
}

interface INewAccessToken {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  scope: string;
  expiresIn: number;
}

export async function authorization(): Promise<IAccessToken | undefined> {
  console.log(CLIENT_ID);
  const config = {
    serviceConfiguration: {
      authorizationEndpoint: 'https://accounts.spotify.com/authorize',
      tokenEndpoint: 'https://accounts.spotify.com/api/token',
    },
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUrl: REDIRECT_URL,
    scopes: [
      'user-modify-playback-state',
      'user-read-currently-playing',
      'user-read-playback-state',
      'user-library-modify',
      'user-library-read',
      'playlist-read-private',
      'playlist-read-collaborative',
      'playlist-modify-public',
      'playlist-modify-private',
      'user-read-recently-played',
      'user-top-read',
    ],
  };

  authorize(config)
    .then((response) => {
      const { accessToken, accessTokenExpirationDate, refreshToken } = response;
      return {
        accessToken,
        expirationDate: accessTokenExpirationDate,
        refreshToken,
      };
    })
    .catch((error) => {
      console.log(error);
    });

  try {
    const response = await authorize(config);
    const { accessToken, accessTokenExpirationDate, refreshToken } = response;
    return {
      accessToken,
      expirationDate: accessTokenExpirationDate,
      refreshToken,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function handleNewAccessToken(
  refreshToken: string
): Promise<INewAccessToken | undefined> {
  const url = 'https://accounts.spotify.com/api/token';

  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refreshToken);
  params.append('client_id', CLIENT_ID);

  console.log(CLIENT_ID, AUTH_BASIC);

  const headers = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: AUTH_BASIC,
    },
  };

  try {
    const response = await api.post(url, params, headers);
    const { access_token, refresh_token, token_type, scope, expires_in } =
      response.data;
    return {
      accessToken: access_token,
      refreshToken: refresh_token,
      tokenType: token_type,
      scope: scope,
      expiresIn: expires_in,
    };
  } catch (e) {
    console.error(e);
  }
}
