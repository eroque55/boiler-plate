import axios from 'axios';

import type { IViaCepResponse } from '@/interfaces/ViaCep';

export const getAdressByZipCode = async (zipCode?: string | null) => {
  if (!zipCode) {
    throw new Error('CEP não informado');
  }

  const normalizedZipCode = zipCode.replace(/\D/g, '');

  if (normalizedZipCode.length !== 8) {
    throw new Error('CEP inválido');
  }

  const { data } = await axios.get<IViaCepResponse>(
    `https://viacep.com.br/ws/${normalizedZipCode}/json/`,
  );

  return data;
};
