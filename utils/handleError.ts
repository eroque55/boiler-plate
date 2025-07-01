import axios, { AxiosError } from 'axios';
import Toast from 'react-native-toast-message';

export const handleError = (
  err: AxiosError | string | Error | unknown,
): void => {
  if (axios.isAxiosError(err)) {
    return Toast.show({
      type: 'error',
      text1:
        err.response?.data?.message ||
        'Houve um imprevisto, tente novamente mais tarde',
    });
  }
  if (err instanceof Error) {
    return Toast.show({
      type: 'error',
      text1: err.message,
    });
  }
  if (typeof err === 'string') {
    return Toast.show({
      type: 'error',
      text1: err,
    });
  }
};

export const handleSuccess = (message: string): void => {
  Toast.show({
    type: 'success',
    text1: message,
  });
};
