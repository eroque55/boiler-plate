import { useMemo, useState } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import {
  TextInputMask,
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
} from 'react-native-masked-text';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';

import colors from '@/global/colors';

import Icon from '../Icon';
import Pressable from '../Pressable';

type Props<TFieldValues extends FieldValues> = {
  label?: string;
  isPassword?: boolean;
  placeholder?: string;
  type?: TextInputMaskTypeProp;
  options?: TextInputMaskOptionProp;
  isBlocked?: boolean;
  minHeight?: number;
} & TextInputProps &
  UseControllerProps<TFieldValues>;

const Input = <TFieldValues extends FieldValues>({
  label,
  isPassword,
  placeholder,
  type,
  options,
  isBlocked,
  control,
  name,
  autoCapitalize = 'none',
  minHeight,
  multiline,
  maxLength,
  ...props
}: Props<TFieldValues>) => {
  const [passwordHidden, setPasswordHidden] = useState(isPassword);

  const length = useMemo(() => {
    if (maxLength) {
      return maxLength;
    }
    if (multiline || minHeight) {
      return 250;
    }
    return 100;
  }, [multiline, maxLength]);

  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return (
    <Animated.View className="w-full gap-1" layout={LinearTransition}>
      {label && <Text className="text-base text-neutral-80">{label}</Text>}

      <View>
        <View
          className="w-full flex-row items-center rounded-lg border border-neutral-20"
          style={{ minHeight }}
        >
          {type ? (
            <TextInputMask
              ref={field.ref}
              autoCapitalize={autoCapitalize}
              editable={!isBlocked}
              multiline={!!minHeight || multiline}
              maxLength={length}
              options={options}
              placeholder={placeholder}
              placeholderTextColor={colors.neutral[40]}
              refInput={field.ref}
              secureTextEntry={passwordHidden}
              style={{
                flexGrow: 1,
                height: '100%',
                minHeight: 44,
                padding: 8,
                fontSize: 18,
                lineHeight: 28,
                color: colors.neutral[60],
                paddingRight: isPassword || isBlocked ? 44 : undefined,
              }}
              textAlignVertical="top"
              type={type}
              value={field.value}
              onChangeText={field.onChange}
              {...props}
            />
          ) : (
            <TextInput
              ref={field.ref}
              autoCapitalize={autoCapitalize}
              className="h-full min-h-11 flex-grow p-2 text-lg text-neutral-60"
              editable={!isBlocked}
              multiline={!!minHeight || multiline}
              maxLength={length}
              placeholder={placeholder}
              placeholderTextColor={colors.neutral[40]}
              secureTextEntry={passwordHidden}
              style={{
                paddingRight: isPassword || isBlocked ? 44 : undefined,
              }}
              textAlignVertical="top"
              value={field.value}
              onChangeText={field.onChange}
              {...props}
            />
          )}

          {isBlocked && (
            <View className="absolute right-3 h-6 w-6 items-center justify-center self-center">
              <Icon color={colors.neutral[60]} name="PadlockIcon" />
            </View>
          )}

          {isPassword && (
            <Pressable
              className="absolute right-2 items-center justify-center overflow-hidden rounded-full p-1"
              onPress={() => {
                setPasswordHidden(!passwordHidden);
              }}
            >
              <Icon
                color={
                  passwordHidden ? colors.neutral[40] : colors.primary[100]
                }
                name={passwordHidden ? 'EyeOffIcon' : 'EyeIcon'}
                size={25}
              />
            </Pressable>
          )}
        </View>

        {error?.message && (
          <Animated.Text
            className="text-xs text-alert-error"
            entering={FadeIn}
            exiting={FadeOut}
          >
            {error.message}
          </Animated.Text>
        )}
      </View>
    </Animated.View>
  );
};

export default Input;
