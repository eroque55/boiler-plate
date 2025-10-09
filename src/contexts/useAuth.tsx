import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  useFetchUser,
  useLogin,
  useRefreshAccessToken,
} from '@/hooks/api/useAuthApi';
import { http } from '@/services/http';
import { TUser } from '@/types/user';
import { LoginForm } from '@/validation/login.validation';

type ContextValues = {
  user: TUser | null;
  logout: (isDelete?: boolean) => Promise<void>;
  login: (user: LoginForm) => Promise<void>;
  loading: boolean;
  fetchUser: () => Promise<void>;
};

type Props = {
  isAppReady: boolean;
};

const AuthContext = createContext({} as ContextValues);

export const AuthProvider = ({
  children,
  isAppReady,
}: PropsWithChildren<Props>) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(true);

  const { mutateAsync: loginService } = useLogin();
  const { mutateAsync: refreshService } = useRefreshAccessToken();

  const { refetch } = useFetchUser();

  const fetchUser = async () => {
    const { data } = await refetch();

    if (data) {
      setUser(data);
    }
  };

  const logout = async () => {
    setUser(null);
    await deleteItemAsync('accessToken');
    await deleteItemAsync('refreshToken');
    queryClient.clear();
  };

  const login = async (form: LoginForm) => {
    try {
      const data = await loginService(form);

      await setItemAsync('accessToken', data.jwt);

      if (data.refreshToken && form?.requestRefresh) {
        await setItemAsync('refreshToken', data.refreshToken);
      }

      await fetchUser();

      router.replace('/(main)/home');
    } catch (err) {
      await logout();
      throw err;
    }
  };

  const refreshAccessToken = async () => {
    const refreshToken = await getItemAsync('refreshToken');

    if (refreshToken) {
      try {
        const data = await refreshService(refreshToken);

        await setItemAsync('accessToken', data.jwt);
        await fetchUser();

        return data.jwt;
      } catch {
        await logout();
      }
    }
  };

  useEffect(() => {
    const getToken = async () => {
      await refreshAccessToken();
      setLoading(false);
    };

    getToken();
  }, []);

  useEffect(() => {
    if (!isAppReady || loading) {
      return;
    }

    SplashScreen.hideAsync();

    if (user) {
      router.replace('/(main)/home');
      return;
    }

    router.replace('/(auth)/login');
  }, [isAppReady, loading]);

  http.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      if (error.message === 'Network Error') {
        return Promise.reject(new Error('Sem conexão com a internet!'));
      }
      if (error.code === 'ERR_SECURESTORE_ENCRYPT_FAILURE') {
        await logout();
        return;
      }
      if (
        error?.response?.status === 401 &&
        originalRequest.url !== 'auth/local/refresh' &&
        !originalRequest.retry
      ) {
        originalRequest.retry = true;
        const accessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return http(originalRequest);
      }
      return Promise.reject(error);
    },
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        login,
        loading,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
