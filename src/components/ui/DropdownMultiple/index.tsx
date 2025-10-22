import { useEffect, useMemo, useState } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { FlatList, Text, TextInput, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';

import { colors } from '@/global/colors';
import { useDropdown } from '@/store/dropdownStore';
import { matchText } from '@/utils/format';

import DropdownItem, { TOption } from '../Dropdown/DropdownItem';
import Icon from '../Icon';
import Pressable from '../Pressable';

type Props<TFieldValues extends FieldValues> = {
  options: TOption[];
  label?: string;
  placeholder?: string;
  searchable?: boolean;
} & UseControllerProps<TFieldValues>;

const DropdownMultiple = <TFieldValues extends FieldValues>({
  options,
  name,
  control,
  label,
  placeholder = 'Selecione',
  searchable,
  disabled,
}: Props<TFieldValues>) => {
  const { dropDownKey, setDropDownKey } = useDropdown();

  const [searchText, setSearchText] = useState('');

  const isOpen = dropDownKey === name;

  useEffect(() => {
    setSearchText('');
  }, [isOpen]);

  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const toggleDropdown = () => {
    if (isOpen) {
      setDropDownKey('');
    } else {
      setDropDownKey(name);
    }
  };

  const isSelected = (value: string): boolean => {
    return field.value?.includes(value);
  };

  const handleSelect = (value: string) => {
    if (isSelected(value)) {
      field.onChange(field.value.filter((v: string) => v !== value));
      return;
    }

    field.onChange([...(field.value || []), value]);
  };

  const filteredOptions = useMemo(() => {
    if (!searchText) {
      return options;
    }

    return options.filter(option => matchText(option.label, searchText));
  }, [options, searchText]);

  const visibleText = useMemo(() => {
    if (field.value) {
      const selectedOption = options
        .filter(option => field.value.includes(option.value))
        .map(option => option.label);

      return selectedOption.join(', ') || placeholder;
    }

    return placeholder;
  }, [field.value, placeholder, options]);

  return (
    <Animated.View className="w-full gap-1" layout={LinearTransition}>
      {label && <Text className="text-base text-neutral-80">{label}</Text>}

      <Animated.View
        ref={field.ref}
        className="w-full overflow-hidden rounded-lg border border-neutral-20"
        layout={LinearTransition}
      >
        <Pressable
          className="w-full flex-row items-center justify-between gap-2 p-2"
          disabled={disabled}
          onPress={toggleDropdown}
        >
          <Text
            className="flex-1 text-lg"
            numberOfLines={1}
            style={{
              color: field.value ? colors.neutral[60] : colors.neutral[40],
            }}
          >
            {visibleText}
          </Text>

          <Icon
            color={colors.neutral[60]}
            name="ChevronIcon"
            rotate={isOpen ? 180 : 0}
            size={12}
          />
        </Pressable>

        {isOpen && (
          <>
            {searchable && (
              <View className="p-1">
                <TextInput
                  className="rounded-md border border-neutral-20 p-1 text-base text-neutral-60"
                  placeholder="Pesquisar..."
                  placeholderTextColor={colors.neutral[40]}
                  value={searchText}
                  onChangeText={setSearchText}
                />
              </View>
            )}

            <FlatList
              nestedScrollEnabled
              className="max-h-48 w-full"
              data={filteredOptions}
              keyExtractor={item => item.value}
              ListEmptyComponent={
                <Text className="p-2 text-center text-sm text-neutral-80">
                  Nenhuma opção encontrada
                </Text>
              }
              renderItem={({ item }) => (
                <DropdownItem
                  isSelected={isSelected(item.value)}
                  option={item}
                  onPress={() => handleSelect(item.value)}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </Animated.View>

      {error?.message && (
        <Animated.Text
          className="text-xs text-alert-error"
          entering={FadeIn}
          exiting={FadeOut}
          layout={LinearTransition}
        >
          {error.message}
        </Animated.Text>
      )}
    </Animated.View>
  );
};

export default DropdownMultiple;
