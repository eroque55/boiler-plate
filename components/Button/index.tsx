import { PropsWithChildren, useMemo } from 'react';
import {
  ActivityIndicator,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

import { IconComponent, IconT } from '@/components/Icon/Icon';
import colors from '@/global/colors';
import { useDisableDelay } from '@/hooks/useDisableDelay';

interface Props extends TouchableOpacityProps {
  onPress: () => void;
  height?: number;
  bgColor?: string;
  fontColor?: string;
  fontSize?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
  outline?: boolean;
  isLoading?: boolean;
  iconLeft?: IconT;
  withoutDelay?: boolean;
}

const Button = ({
  children,
  onPress,
  height = 44,
  bgColor,
  fontColor,
  fontSize = 18,
  style,
  textStyle,
  outline,
  isLoading,
  iconLeft,
  withoutDelay = false,
  disabled = false,
  ...props
}: PropsWithChildren<Props>) => {
  const { executeWithDelay, isLoading: loading } = useDisableDelay();

  const backgroundColor = useMemo(() => {
    if (bgColor) {
      return bgColor;
    }
    if (outline) {
      return colors.primary[100];
    }
    return colors.primary[100];
  }, [bgColor]);

  const textColor = useMemo(() => {
    if (fontColor) {
      return fontColor;
    }
    if (outline) {
      return colors.primary[100];
    }
    return colors.primary[100];
  }, [fontColor]);

  const handlePress = async () => {
    if (onPress && withoutDelay) {
      return onPress();
    }
    if (onPress) {
      return executeWithDelay(onPress);
    }
  };

  const renderIcon = () => {
    if (iconLeft) {
      return (
        <IconComponent name={iconLeft} size={fontSize} color={textColor} />
      );
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      style={[{ height, backgroundColor }, style]}
      disabled={disabled || loading}
      className="flex-row"
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator size={fontSize} color={textColor} />
      ) : (
        <>
          {renderIcon()}

          <Text style={{ color: textColor, ...textStyle }} className="">
            {children}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
