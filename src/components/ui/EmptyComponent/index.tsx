import { Text, View } from 'react-native';

type Props = {
  text?: string;
};

const EmptyComponent = ({ text = 'Nada encontrado' }: Props) => {
  return (
    <View className="flex-1 items-center justify-center py-10">
      <Text className="text-base text-neutral-60">{text}</Text>
    </View>
  );
};

export default EmptyComponent;
