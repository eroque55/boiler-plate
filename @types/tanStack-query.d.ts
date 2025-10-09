/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { TQueryKey } from '@/constants/queryKeys';
import '@tanstack/react-query';

declare module '@tanstack/react-query' {
  interface Register {
    queryKey: TQueryKey;
    mutationMeta: { invalidateQueries: TQueryKey };
  }
}
