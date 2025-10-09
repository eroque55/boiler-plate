import { TLoginResponse, TUser } from '@/types/user';
import { LoginForm } from '@/validation/login.validation';

import { http } from '../http';

const BASE_URL = '/auth';

export const authService = {
  login: async (form: LoginForm) => {
    const { data } = await http.post<TLoginResponse>(`${BASE_URL}/local`, form);
    return data;
  },

  refreshAccessToken: async (refreshToken: string) => {
    const { data } = await http.post<TLoginResponse>(
      `${BASE_URL}/refresh-token`,
      {
        refreshToken,
      },
    );
    return data;
  },

  fetchUser: async () => {
    const { data } = await http.get<TUser>(`${BASE_URL}/me`);
    return data;
  },
};
