import { useState } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextProps,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import {
  TextInputMask,
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
} from 'react-native-masked-text';

import colors from '@/global/colors';

import { IconComponent, IconComponentProps } from '../IconComponent';

type Props<TFieldValues extends FieldValues> = {
  label?: string;
  password?: boolean;
  placeholder?: string;
  type?: TextInputMaskTypeProp;
  options?: TextInputMaskOptionProp;
  leftIcon?: IconComponentProps;
  flex?: boolean;
  labelProps?: TextProps;
  containerProps?: ViewProps;
} & TextInputProps &
  UseControllerProps<TFieldValues>;

const Input = <TFieldValues extends FieldValues>({
  label,
  password,
  placeholder,
  type,
  options,
  leftIcon,
  flex = false,
  control,
  name,
  autoCapitalize = 'none',
  editable = true,
  multiline = false,
  labelProps,
  containerProps,
  ...props
}: Props<TFieldValues>) => {
  const [passwordHidden, setPasswordHidden] = useState(password);
  const [isFocused, setIsFocused] = useState(false);

  if (!control) {
    throw new Error('Control was not passed as a prop');
  }

  if (!name) {
    throw new Error('Name was not passed as a prop');
  }

  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    field.onBlur();
    props.onBlur?.(e);
  };

  return (
    <View
      style={{ flex: flex ? 1 : undefined }}
      className="gap-2"
      {...containerProps}
    >
      {label && (
        <Text
          className="font-montserrat text-base text-neutral-80"
          {...labelProps}
        >
          {label}
        </Text>
      )}

      <View style={{ flex: multiline ? 1 : undefined }}>
        <View
          style={{
            flex: multiline ? 1 : undefined,
            borderColor: isFocused ? colors.primary[100] : colors.neutral[20],
            opacity: editable ? 1 : 0.3,
          }}
          className="flex-row items-center rounded-xl border"
        >
          {leftIcon && (
            <View className="absolute left-3 top-3 h-6 w-6 items-center justify-center">
              <IconComponent
                name={leftIcon.name}
                size={leftIcon.size || 24}
                color={leftIcon.color || colors.neutral[40]}
              />
            </View>
          )}

          {type ? (
            <TextInputMask
              style={{
                flex: 1,
                padding: 12,
                fontFamily: 'Raleway_400Regular',
                fontSize: 16,
                paddingLeft: leftIcon ? 44 : undefined,
                paddingRight: password ? 44 : undefined,
                color: colors.neutral[80],
                lineHeight: 24,
              }}
              textAlignVertical="top"
              onChangeText={field.onChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              value={field.value}
              refInput={field.ref}
              type={type}
              secureTextEntry={passwordHidden}
              placeholder={placeholder}
              placeholderTextColor={colors.neutral[40]}
              editable={editable}
              options={options}
              multiline={multiline}
              {...props}
            />
          ) : (
            <TextInput
              style={{
                paddingLeft: leftIcon ? 44 : undefined,
                paddingRight: password ? 44 : undefined,
              }}
              className="font-raleway h-full flex-1 p-3 text-base text-neutral-80"
              textAlignVertical="top"
              onChangeText={field.onChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              secureTextEntry={passwordHidden}
              placeholder={placeholder}
              autoCapitalize={autoCapitalize}
              placeholderTextColor={colors.neutral[40]}
              value={field.value}
              editable={editable}
              multiline={multiline}
              {...props}
            />
          )}

          {password && (
            <TouchableOpacity
              className="absolute right-3 items-center justify-center"
              onPress={() => setPasswordHidden(!passwordHidden)}
            >
              <IconComponent
                name={
                  passwordHidden
                    ? 'PasswordEyeInactiveIcon'
                    : 'PasswordEyeActiveIcon'
                }
                size={25}
              />
            </TouchableOpacity>
          )}
        </View>

        {error?.message && (
          <Text className="font-raleway text-xs text-alert-error-primary">
            {error.message}
          </Text>
        )}
      </View>
    </View>
  );
};

export default Input;
