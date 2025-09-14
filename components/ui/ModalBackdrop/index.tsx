/* eslint-disable no-restricted-imports */
import { PropsWithChildren, useEffect } from 'react';
import { BackHandler, Keyboard, Pressable } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { height } from '@/global/constants';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  onPress?: () => void;
};

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

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  return (
    <Animated.View
      className="absolute w-screen bg-black/25"
      entering={FadeIn}
      exiting={FadeOut}
      style={{ height: height + top }}
    >
      <Pressable
        className="flex-1 items-center justify-center"
        onPress={onPress}
      >
        <AnimatedPressable
          className="w-[90%]"
          layout={LinearTransition}
          onPress={e => e.stopPropagation()}
        >
          {children}
        </AnimatedPressable>
      </Pressable>
    </Animated.View>
  );
};

export default ModalBackdrop;
