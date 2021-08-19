import React, { createContext, useState, useEffect, useContext } from 'react';
import { parseISO, addHours, isAfter } from 'date-fns';

import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as auth from '../services/auth';
import api from '../services/api';

interface IToken {
  accessToken: string;
  accessTokenExpirationDate: string;
  refreshToken: string;
}

interface IAuthContextData {
  signed: boolean;
  token: IToken | null;
  loading: boolean;
  handleAccessToken(): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<IToken | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAccessTokenWithRefreshToken(
    refreshToken: string
  ): Promise<void> {
    const response = await auth.handleNewAccessToken(refreshToken);
    if (response) {
      await AsyncStorage.setItem('@SPGAuth:accessToken', response.accessToken);
    }
  }

  useEffect(() => {
    async function loadStorageData() {
      const storageAccessToken = await AsyncStorage.getItem('@SPG:accessToken');
      const storageRefreshToken = await AsyncStorage.getItem(
        '@SPG:refreshToken'
      );
      const storageTokenExpirationDate = await AsyncStorage.getItem(
        '@SPG:accessTokenExpirationDate'
      );

      if (
        storageAccessToken &&
        storageRefreshToken &&
        storageTokenExpirationDate
      ) {
        const currentTime = addHours(new Date(), 1);
        const lastValidTime = addHours(parseISO(storageTokenExpirationDate), 1);

        if (!isAfter(currentTime, lastValidTime)) {
          handleAccessTokenWithRefreshToken(storageRefreshToken);
        }
        api.defaults.headers.Authorization = `Bearer ${storageAccessToken}`;
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  async function handleAccessToken() {
    setLoading(true);
    const response = await auth.authorization();
    console.log(response);
    if (response.accessToken) {
      const { accessToken, refreshToken, accessTokenExpirationDate } = response;

      api.defaults.headers.Authorization = `Bearer ${accessToken}`;

      await AsyncStorage.setItem('@SPG:accessToken', accessToken);
      await AsyncStorage.setItem('@SPG:refreshToken', refreshToken);
      await AsyncStorage.setItem(
        '@SPG:accessTokenExpirationDate',
        accessTokenExpirationDate
      );
      setLoading(false);
      return setToken(response);
    }
    setLoading(false);
    Alert.alert(
      'Ocorreu um erro ao autorizar o aplicativo. Por favor, tente novamente.'
    );
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setToken(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!token,
        token,
        loading,
        handleAccessToken,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
