import { authorize } from 'react-native-app-auth';
import api from '../services/api';

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
  const config = {
    serviceConfiguration: {
      authorizationEndpoint: 'https://accounts.spotify.com/authorize',
      tokenEndpoint: 'https://accounts.spotify.com/api/token',
    },
    clientId: 'f2088127db604e0086b00450e8d0197b',
    clientSecret: 'c05b37737231499485a9b8974cae2ed2',
    redirectUrl: 'com.generator.playlist.spotify.app://callback',
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
  params.append('client_id', 'f2088127db604e0086b00450e8d0197b');

  const headers = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ZjIwODgxMjdkYjYwNGUwMDg2YjAwNDUwZThkMDE5N2I6YzA1YjM3NzM3MjMxNDk5NDg1YTliODk3NGNhZTJlZDI=',
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
