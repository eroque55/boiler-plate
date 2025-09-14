/* eslint-disable no-restricted-imports */
import { PropsWithChildren } from 'react';
import { PressableProps, Pressable as RNPressable, View } from 'react-native';
import Animated from 'react-native-reanimated';

const Pressable = ({
  children,
  ...props
}: PropsWithChildren<PressableProps>) => {
  return (
    <RNPressable {...props}>
      {({ pressed }) => (
        <>
          {children}

          {pressed && <View className="absolute inset-0 bg-black/10" />}
        </>
      )}
    </RNPressable>
  );
};

export default Pressable;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export { AnimatedPressable };
