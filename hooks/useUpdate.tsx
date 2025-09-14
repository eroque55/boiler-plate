import * as Updates from 'expo-updates';
import { useEffect, useState } from 'react';

import { handleSuccess } from '@/utils/handleError';

const useUpdate = () => {
  const [isLoading, setIsLoadingUpdate] = useState(false);
  useEffect(() => {
    const update = async () => {
      try {
        if (__DEV__) {
          return;
        }

        setIsLoadingUpdate(true);
        const { isAvailable } = await Updates.checkForUpdateAsync();

        if (isAvailable) {
          handleSuccess('Aplicativo Atualizando');
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } finally {
        setIsLoadingUpdate(false);
      }
    };

    update();
  }, []);

  return isLoading;
};

export default useUpdate;
