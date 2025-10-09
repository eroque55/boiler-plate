export const queryKeys = {
  user: {
    me: ['user'] as const,
  },

  zipCode: {
    all: ['zip-codes'] as const,
    details: (id: string) => [...queryKeys.zipCode.all, 'details', id] as const,
  },
} as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExtractQueryKey<T> = T extends (...args: any[]) => infer R ? R : T;

export type TQueryKey = {
  [K in keyof typeof queryKeys]: {
    [P in keyof (typeof queryKeys)[K]]: ExtractQueryKey<
      (typeof queryKeys)[K][P]
    >;
  }[keyof (typeof queryKeys)[K]];
}[keyof typeof queryKeys];
