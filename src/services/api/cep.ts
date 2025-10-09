import axios from 'axios';

import { TViaCEPResponse } from '@/types/viaCEP';

export const zipCodeService = {
  getAddress: async (zipCode: string) => {
    const { data } = await axios.get<TViaCEPResponse>(
      `https://viacep.com.br/ws/${zipCode}/json/`,
    );
    return data;
  },
};
