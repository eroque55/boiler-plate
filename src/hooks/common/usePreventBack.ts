import { router } from 'expo-router';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';

import { useDefaultModal } from '@/store/defaultModalStore';

export const usePreventBack = (enabled?: boolean) => {
  const { openModal } = useDefaultModal();

  const handleBack = () => {
    if (!enabled) {
      router.back();
      return;
    }

    openModal({
      title: 'Descartar?',
      message: 'Tem certeza que deseja descartar os dados inseridos?',
      confirmText: 'Descartar',
      cancelText: 'Cancelar',
      onConfirm: () => router.back(),
    });
  };

  useEffect(() => {
    const backHandler = () => {
      handleBack();

      return true;
    };

    const backHandlerSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      backHandler,
    );

    return () => {
      backHandlerSubscription.remove();
    };
  }, [enabled]);

  return { handleBack };
};
