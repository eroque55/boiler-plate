import { PropsWithChildren } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { View } from 'react-native';

import { colors } from '@/global/colors';

import Icon from '../Icon';
import Pressable from '../Pressable';

type Props<TFieldValues extends FieldValues> = UseControllerProps<TFieldValues>;

const Checkbox = <TFieldValues extends FieldValues>({
  control,
  name,
  children,
}: PropsWithChildren<Props<TFieldValues>>) => {
  const { field } = useController({ control, name });

  return (
    <Pressable
      className="flex-row items-center gap-2"
      showFeedback={false}
      onPress={() => field.onChange(!field.value)}
    >
      <View
        className="h-6 w-6 items-center justify-center overflow-hidden rounded-md"
        hitSlop={12}
        style={{
          backgroundColor: field.value ? colors.alert.success[100] : undefined,
          borderColor: colors.neutral[200],
          borderWidth: field.value ? 0 : 1,
        }}
      >
        {field.value && (
          <Icon color={colors.white} name="CheckIcon" size={14} />
        )}
      </View>

      {children}
    </Pressable>
  );
};

export default Checkbox;
