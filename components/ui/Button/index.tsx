import { PropsWithChildren } from 'react';
import {
  DimensionValue,
  GestureResponderEvent,
  Keyboard,
  PressableProps,
  Text,
} from 'react-native';
import { AnimatedProps, LinearTransition } from 'react-native-reanimated';

import colors from '@/global/colors';
import { useDisableDelay } from '@/hooks/useDisableDelay';

import Icon, { IconProps } from '../Icon';
import { AnimatedPressable } from '../Pressable';

import ButtonActivityIndicator from './ButtonActivityIndicator';

type Props = {
  text?: string;
  wired?: boolean;
  color?: string;
  leftIcon?: IconProps;
  isLoading?: boolean;
  width?: DimensionValue;
  withoutDelay?: boolean;
} & PressableProps &
  AnimatedProps<PropsWithChildren<PressableProps>>;

const Button = ({
  text,
  wired = false,
  color = colors.primary[100],
  isLoading = false,
  onPress,
  withoutDelay = false,
  width = '100%',
  leftIcon,
  ...props
}: PropsWithChildren<Props>) => {
  const { executeWithDelay, isLoading: loading } = useDisableDelay();

  const handleColor = () => {
    if (wired) {
      return undefined;
    }

    return color;
  };

  const handleTextColor = () => {
    if (wired) {
      return color;
    }

    return colors.neutral.white;
  };

  const handlePress = async (e: GestureResponderEvent) => {
    Keyboard.dismiss();

    if (!onPress) {
      return;
    }

    if (withoutDelay) {
      onPress(e);
      return;
    }

    await executeWithDelay(() => onPress(e));
  };

  return (
    <AnimatedPressable
      className="flex-row items-center justify-center gap-3 overflow-hidden rounded-lg border-2 p-2"
      layout={LinearTransition}
      style={{
        backgroundColor: handleColor(),
        borderColor: wired ? color : colors.transparent,
        width,
      }}
      onPress={handlePress}
      {...props}
    >
      {leftIcon && (
        <Icon color={leftIcon.color || handleTextColor()} {...leftIcon} />
      )}

      <Text
        className="text-base"
        style={{
          color: handleTextColor(),
        }}
      >
        {text}
      </Text>

      {(isLoading || loading) && <ButtonActivityIndicator />}
    </AnimatedPressable>
  );
};

export default Button;
