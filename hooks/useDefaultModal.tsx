import { useContext } from 'react';

import { DefaultModalContext } from '@/contexts/defaultModalContext';

const useDefaultModal = () => {
  const { modal, openModal, closeModal } = useContext(DefaultModalContext);

  return {
    modal,
    openModal,
    closeModal,
  };
};
export default useDefaultModal;
