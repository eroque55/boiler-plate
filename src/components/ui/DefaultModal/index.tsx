import { Text, View } from 'react-native';

import { useDefaultModal } from '@/store/defaultModalStore';

import ModalBackdrop from '../ModalBackdrop';

import DefaultModalButton from './DefaultModalButton';

export type DefaultModalProps = {
  title: string;
  message: string;
  confirmText: string;
  notice?: string;
  onConfirm?: () => Promise<void> | void;
  cancelText?: string;
  onCancel?: () => Promise<void> | void;
  successMessage?: string;
};

const DefaultModal = () => {
  const { modal, closeModal, openModal } = useDefaultModal();

  if (!modal) {
    return null;
  }

  const handleConfirm = async () => {
    if (modal.onConfirm) {
      await modal.onConfirm();
    }

    closeModal();

    if (modal.successMessage) {
      openModal({
        title: 'Sucesso!',
        message: modal.successMessage,
        confirmText: 'Voltar',
      });
    }
  };

  const handleCancel = async () => {
    if (modal.onCancel) {
      await modal.onCancel();
    }
    closeModal();
  };

  return (
    <ModalBackdrop>
      <View
        key={modal.message}
        className="w-full overflow-hidden rounded-lg bg-white"
      >
        <View className="bg-neutral-background p-3">
          <Text className="text-xl text-neutral-100">{modal.title}</Text>
        </View>

        <View className="min-h-28 gap-2 border-y border-neutral-20 p-3">
          <Text className="text-base text-neutral-80">{modal.message}</Text>

          {modal.notice && (
            <Text className="text-sm text-neutral-60">{modal.notice}</Text>
          )}
        </View>

        <View className="flex-row">
          {modal.cancelText && (
            <DefaultModalButton
              text={modal.cancelText}
              onPress={handleCancel}
            />
          )}

          <DefaultModalButton
            text={modal.confirmText}
            onPress={handleConfirm}
          />
        </View>
      </View>
    </ModalBackdrop>
  );
};

export default DefaultModal;
