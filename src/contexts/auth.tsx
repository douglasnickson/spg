import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import { parseISO, addHours, isAfter } from 'date-fns';

import * as auth from '../services/auth';
import api from '../services/api';
import { IToken } from 'src/model/IToken';

interface IAuthContextData {
  signed: boolean;
  token: IToken | null;
  loading: boolean;
  handleAccessToken(): Promise<void>;
  signOut(): void;
  currentPlaylist: IPlaylist | null;
  handlePlaylist(playlist: IPlaylist | null): void;
}

interface IPlaylist {
  data: {
    id: string;
    name: string;
    description: string;
  };
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<IToken | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState<any>(null);

  async function handleAccessTokenWithRefreshToken(
    refreshToken: string
  ): Promise<void> {
    setLoading(true);
    const response = await auth.handleNewAccessToken(refreshToken);
    if (response) {
      const expirationDate = addHours(new Date(), 1).toISOString();

      await AsyncStorage.setItem('@SPG:accessToken', response.accessToken);
      await AsyncStorage.setItem('@SPG:refreshToken', response.refreshToken);
      await AsyncStorage.setItem('@SPG:expirationDate', expirationDate);
      api.defaults.headers.common.Authorization = `Bearer ${response.accessToken}`;
      console.log(response.accessToken);
    }
    setLoading(false);
  }

  useEffect(() => {
    async function loadStorageData() {
      const accessToken = await AsyncStorage.getItem('@SPG:accessToken');
      const refreshToken = await AsyncStorage.getItem('@SPG:refreshToken');
      const expirationDate = await AsyncStorage.getItem('@SPG:expirationDate');

      if (accessToken && refreshToken && expirationDate) {
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        setLoading(true);
        const currentTime = addHours(new Date(), 1);
        const lastValidTime = addHours(parseISO(expirationDate), 1);

        setToken({ accessToken, refreshToken, expirationDate });
        if (isAfter(currentTime, lastValidTime)) {
          console.log('refresh token');
          handleAccessTokenWithRefreshToken(refreshToken);
        }
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  async function handleAccessToken() {
    setLoading(true);
    const response = await auth.authorization();
    if (response && response.accessToken) {
      const { accessToken, refreshToken, expirationDate } = response;

      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      await AsyncStorage.setItem('@SPG:accessToken', accessToken);
      await AsyncStorage.setItem('@SPG:refreshToken', refreshToken);
      await AsyncStorage.setItem('@SPG:expirationDate', expirationDate);
      setLoading(false);
      return setToken(response);
    }
    setLoading(false);
    Alert.alert('Erro', 'Ocorreu um erro ao autorizar o aplicativo.');
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setToken(null);
    });
  }

  function handlePlaylist(playlist: any) {
    setCurrentPlaylist(playlist);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!token,
        token,
        loading,
        handleAccessToken,
        signOut,
        currentPlaylist,
        handlePlaylist,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
