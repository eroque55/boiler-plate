import { useState } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewProps,
} from 'react-native';
import {
  TextInputMask,
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
} from 'react-native-masked-text';
import Animated, {
  AnimatedProps,
  LinearTransition,
} from 'react-native-reanimated';

import { colors } from '@/global/colors';

import ErrorText from '../ErrorText';
import Icon, { IconProps } from '../Icon';
import Pressable from '../Pressable';

type Props<TFieldValues extends FieldValues> = {
  label?: string;
  isPassword?: boolean;
  placeholder?: string;
  type?: TextInputMaskTypeProp;
  options?: TextInputMaskOptionProp;
  minHeight?: number;
  containerProps?: AnimatedProps<ViewProps>;
  icon?: IconProps;
} & TextInputProps &
  UseControllerProps<TFieldValues>;

const Input = <TFieldValues extends FieldValues>({
  label,
  isPassword,
  placeholder,
  type,
  options,
  control,
  name,
  autoCapitalize = 'none',
  minHeight,
  containerProps,
  icon,
  multiline,
  maxLength,
  ...props
}: Props<TFieldValues>) => {
  const [passwordHidden, setPasswordHidden] = useState(isPassword);

  const length = () => {
    if (maxLength) {
      return maxLength;
    }
    if (multiline || minHeight) {
      return 250;
    }
    return 100;
  };

  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const inputStyle: StyleProp<TextStyle> = {
    flexGrow: 1,
    height: '100%',
    padding: 12,
    fontSize: 14,
    color: colors.neutral[600],
    paddingRight: isPassword || icon ? 44 : undefined,
  };

  const commonProps: TextInputProps = {
    autoCapitalize,
    maxLength: length(),
    multiline: !!minHeight || multiline,
    placeholder,
    placeholderTextColor: colors.neutral[400],
    secureTextEntry: passwordHidden,
    style: inputStyle,
    textAlignVertical: 'top',
    value: field.value,
    onChangeText: field.onChange,
    onBlur: field.onBlur,
    ...props,
  };

  return (
    <Animated.View
      className="w-full gap-2"
      layout={LinearTransition}
      {...containerProps}
    >
      {label && (
        <Text className="font-areaextend_semibold text-base text-neutral-600">
          {label}
        </Text>
      )}

      <View className="w-full gap-px">
        <View
          className="border-neutral-20 w-full flex-row items-center rounded-lg border bg-white"
          style={{ minHeight }}
        >
          {type ? (
            <TextInputMask
              options={options}
              refInput={field.ref}
              type={type}
              {...commonProps}
            />
          ) : (
            <TextInput ref={field.ref} {...commonProps} />
          )}

          {isPassword && (
            <Pressable
              className="absolute right-2 items-center justify-center overflow-hidden rounded-full p-1"
              onPress={() => {
                setPasswordHidden(!passwordHidden);
              }}
            >
              <Icon
                key={passwordHidden ? 'EyeOff' : 'Eye'}
                name={passwordHidden ? 'EyeOffIcon' : 'EyeIcon'}
                size={24}
                strokeWidth={1.5}
              />
            </Pressable>
          )}

          {icon && (
            <View className="absolute right-2 self-center">
              <Icon {...icon} />
            </View>
          )}
        </View>

        <ErrorText text={error?.message} />
      </View>
    </Animated.View>
  );
};

export default Input;
