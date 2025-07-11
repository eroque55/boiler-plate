import { Text, View } from 'react-native';

import colors from '@/global/colors';
import useDefaultModal from '@/hooks/useDefaultModal';

import Button from '../Button';
import ModalBackdrop from '../ModalBackdrop';

export interface DefaultModalProps {
  type?: 'success' | 'error';
  title?: string;
  message?: string;
  confirmText?: string;
  confirmAction?: () => void;
  cancelText?: string;
  cancelAction?: () => void;
  successMessage?: string;
  buttonsColor?: string;
}

const DefaultModal = () => {
  const { modal, closeModal, openModal } = useDefaultModal();

  if (!modal) {
    return null;
  }

  const handleConfirm = () => {
    modal.confirmAction?.();
    if (modal.successMessage) {
      openModal({
        type: 'success',
        title: 'Sucesso!',
        message: modal.successMessage,
      });
    } else {
      closeModal();
    }
  };

  const handleCancel = () => {
    modal.cancelAction?.();
    closeModal();
  };

  return (
    <ModalBackdrop>
      <View className="w-full items-center gap-6 rounded-lg bg-neutral-background px-4 py-6">
        <Text
          className="text-2xl"
          style={{
            color:
              modal.type === 'success'
                ? colors.alert.success.primary
                : colors.alert.error.primary,
          }}
        >
          {modal.title || 'Atenção!'}
        </Text>

        <Text className="w-full text-center text-base text-neutral-60">
          {modal.message || 'Tem certeza?'}
        </Text>

        <View className="w-full flex-row-reverse items-center justify-between">
          <Button
            text={modal.confirmText || 'Voltar'}
            onPress={handleConfirm}
            color={modal.buttonsColor}
            width="48%"
          />

          {modal.cancelText && (
            <Button
              text={modal.cancelText}
              wired
              onPress={handleCancel}
              color={modal.buttonsColor}
              width="48%"
            />
          )}
        </View>
      </View>
    </ModalBackdrop>
  );
};

export default DefaultModal;
