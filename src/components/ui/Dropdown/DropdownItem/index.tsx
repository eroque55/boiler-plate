import { PressableProps, Text } from 'react-native';

import { colors } from '@/global/colors';

import Pressable from '../../Pressable';

export type TOption = {
  label: string;
  value: string;
};

type Props = {
  option: TOption;
  isSelected?: boolean;
} & PressableProps;

const DropdownItem = ({ option: { label }, isSelected, ...props }: Props) => {
  return (
    <Pressable
      className="w-full px-3 py-1"
      style={{
        backgroundColor: isSelected ? colors.primary[20] : colors.transparent,
      }}
      {...props}
    >
      <Text
        className="flex-grow text-base"
        style={{ color: isSelected ? colors.primary[100] : colors.neutral[60] }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default DropdownItem;
