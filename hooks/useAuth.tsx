/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import { api } from '@/services/api';
import { SplashScreen, useRouter, useSegments } from 'expo-router';

export interface IResponseLogin {
  user: User;
  access_token: string;
  refresh_token: string;
}

enum Roles {
  User = 'user',
}

export interface User {
  avatar: string | null;
  created_at: string;
  email: string;
  id: string;
  name: string;
  phone: string;
  role: Roles;
  updated_at: string;
}

interface IUserProvider {
  user: User;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  login: (user: IResponseLogin) => Promise<void>;
  loading: boolean;
}

interface ChildrenProps {
  children: ReactNode;
  isAppReady: boolean;
}

const AuthContext = createContext({} as IUserProvider);

const AuthProvider = ({ children, isAppReady }: ChildrenProps) => {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const isAuthenticated = user.id !== undefined;

  const refreshAccessToken = async () => {
    const refreshToken = await getItemAsync('refreshToken');

    if (refreshToken) {
      try {
        const { data } = await api.put('/user/session', {
          refresh_token: refreshToken,
        });
        await setItemAsync('accessToken', data.accessToken);
        await setItemAsync('refreshToken', data.refreshToken);

        setUser(data.user);
        return data?.access_token;
      } catch (err) {
        deleteItemAsync('accessToken');
        deleteItemAsync('refreshToken');
      }
    }
  };

  api.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      if (error.message === 'Network Error') {
        return Promise.reject(new Error('Sem conexão com a internet!'));
      }
      if (error.code === 'ERR_SECURESTORE_ENCRYPT_FAILURE') {
        await deleteItemAsync('accessToken');
        await deleteItemAsync('refreshToken');
        return logout();
      }
      if (
        error.response.status === 401 &&
        originalRequest.url !== '/user/session' &&
        !originalRequest.retry
      ) {
        originalRequest.retry = true;
        const accessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      }
      return Promise.reject(error);
    },
  );

  useEffect(() => {
    refreshAccessToken().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (isAuthenticated && isAppReady && !loading) {
      router.push('/Home/');
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 500);
    } else if (isAppReady && !loading) {
      router.push('/Login/');
      SplashScreen.hideAsync();
    }
  }, [isAuthenticated, isAppReady, loading]);

  const login = async (_user: IResponseLogin) => {
    await setItemAsync('accessToken', _user.access_token);
    if (_user.refresh_token) {
      await setItemAsync('refreshToken', _user.refresh_token);
    }

    setUser(_user.user);
  };

  const logout = async () => {
    setUser({} as User);
    await deleteItemAsync('accessToken');
    await deleteItemAsync('refreshToken');
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, logout, login, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
