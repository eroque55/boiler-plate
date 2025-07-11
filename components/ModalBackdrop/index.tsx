import { PropsWithChildren, useEffect } from 'react';
import { BackHandler, Pressable } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { height } from '@/global/constants';

interface Props {
  onPress?: () => void;
}

const ModalBackdrop = ({ onPress, children }: PropsWithChildren<Props>) => {
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    const backHandler = () => {
      onPress?.();
      return true;
    };
    const backHandlerListener = BackHandler.addEventListener(
      'hardwareBackPress',
      backHandler,
    );
    return () => {
      backHandlerListener.remove();
    };
  }, [onPress]);

  return (
    <Animated.View
      style={{ height: height + top }}
      className="absolute z-40 w-screen bg-[rgba(0,0,0,0.30)]"
      entering={FadeIn}
      exiting={FadeOut}
    >
      <KeyboardAvoidingView className="flex-1" behavior="padding">
        <Pressable
          className="flex-1 items-center justify-center"
          onPress={onPress}
        >
          <Pressable onPress={e => e.stopPropagation()} className="w-[90%]">
            {children}
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

export default ModalBackdrop;
