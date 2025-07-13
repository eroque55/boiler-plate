import { useMemo } from 'react';
import {
  ActivityIndicator,
  DimensionValue,
  GestureResponderEvent,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import Animated, {
  AnimatedProps,
  LinearTransition,
} from 'react-native-reanimated';

import colors from '@/global/colors';
import { useDisableDelay } from '@/hooks/useDebounce';

import Icon, { IconProps } from '../Icon';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

type Props = {
  text?: string;
  wired?: boolean;
  color?: string;
  leftIcon?: IconProps;
  unavailable?: boolean;
  isLoading?: boolean;
  withoutDelay?: boolean;
  width?: DimensionValue;
} & TouchableOpacityProps &
  AnimatedProps<TouchableOpacityProps>;

const Button = ({
  text,
  wired = false,
  color = colors.primary[100],
  unavailable = false,
  leftIcon,
  isLoading = false,
  withoutDelay = false,
  onPress,
  disabled,
  width = '100%',
  ...props
}: Props) => {
  const { executeWithDelay, isLoading: loading } = useDisableDelay();

  const handleTextColor = useMemo(() => {
    if (wired) {
      return color;
    }
    return 'white';
  }, [wired, color]);

  const handlePress = async (e: GestureResponderEvent) => {
    Keyboard.dismiss();
    if (onPress && withoutDelay) {
      return onPress(e);
    }
    if (onPress) {
      return executeWithDelay(() => onPress(e));
    }
  };

  return (
    <AnimatedTouchableOpacity
      activeOpacity={0.7}
      style={{
        backgroundColor: wired ? 'transparent' : color,
        borderColor: wired ? color : 'transparent',
        opacity: unavailable ? 0.5 : 1,
        width,
      }}
      className="flex-row items-center justify-center gap-2 rounded-full border p-2"
      disabled={unavailable || disabled || loading}
      onPress={handlePress}
      layout={LinearTransition}
      {...props}
    >
      {isLoading || loading ? (
        <ActivityIndicator size={24} color={handleTextColor} />
      ) : (
        <>
          {leftIcon && (
            <Icon
              name={leftIcon.name}
              size={leftIcon.size || 20}
              color={handleTextColor}
            />
          )}

          <Text
            className="text-base"
            style={{
              color: handleTextColor,
            }}
          >
            {text}
          </Text>
        </>
      )}
    </AnimatedTouchableOpacity>
  );
};

export default Button;
