import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

import Icon from '@/components/ui/Icon';
import { colors } from '@/global/colors';

import Pressable from '../Pressable';

type Props<TFieldValues extends FieldValues> = UseControllerProps<TFieldValues>;

const Checkbox = <TFieldValues extends FieldValues>({
  control,
  name,
  ...props
}: Props<TFieldValues>) => {
  const { field } = useController({ control, name });

  const toggleCheckbox = () => {
    field.onChange(!field.value);
  };

  return (
    <Pressable
      className="h-6 w-6 items-center justify-center overflow-hidden rounded-md"
      hitSlop={12}
      style={{
        backgroundColor: field.value ? colors.alert.success : undefined,
        borderColor: colors.neutral[20],
        borderWidth: field.value ? 0 : 1,
      }}
      onPress={toggleCheckbox}
      {...props}
    >
      {field.value && (
        <Icon color={colors.neutral.white} name="CheckIcon" size={14} />
      )}
    </Pressable>
  );
};

export default Checkbox;
