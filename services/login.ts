import { useMutation, useQuery } from '@tanstack/react-query';

import { ILoginResponse, IUser } from '@/interfaces/user';
import { LoginForm } from '@/validation/login.validation';

export const useLogin = () => {
  const login = async (form: LoginForm) => {
    // const { data } = await api.post<ILoginResponse>('auth/local', form);

    // return data;

    const mockData: ILoginResponse = {
      jwt: 'mocked-jwt-token',
      refreshToken: 'mocked-refresh-token',
      user: {
        id: 1,
        email: form.identifier,
        name: 'John Doe',
      },
    };

    return mockData;
  };

  return useMutation({
    mutationFn: login,
    throwOnError: true,
  });
};

export const useRefreshAccessToken = () => {
  const refreshAccessToken = async (refreshToken: string) => {
    // const { data } = await api.post<{ jwt: string }>('auth/local/refresh', {
    //   refreshToken,
    // });

    // return data;

    const mockData = {
      jwt: refreshToken,
    };

    return mockData;
  };

  return useMutation({
    mutationFn: refreshAccessToken,
    throwOnError: true,
  });
};

export const useFetchUser = () => {
  const fetchUser = async () => {
    // const { data } = await api.get<IUser>(`getMyData`);

    // return data;

    const mockData: IUser = {
      id: 1,
      email: 'john.doe@example.com',
      name: 'John Doe',
    };

    return mockData;
  };

  return useQuery({
    enabled: false,
    gcTime: 0,
    queryFn: fetchUser,
    queryKey: ['fetch-user'],
    staleTime: 0,
    throwOnError: true,
  });
};
