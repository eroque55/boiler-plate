import { useRouter } from 'expo-router';
import { GestureResponderEvent, TouchableOpacityProps } from 'react-native';

import Icon from '../Icon';
import Pressable from '../Pressable';

const BackButton = ({ onPress, ...props }: TouchableOpacityProps) => {
  const router = useRouter();

  const handlePress = (e: GestureResponderEvent) => {
    if (onPress) {
      onPress(e);
      return;
    }

    if (router.canDismiss()) {
      router.back();
    }
  };

  return (
    <Pressable
      className="h-9 w-9 items-center justify-center overflow-hidden rounded-full"
      onPress={handlePress}
      {...props}
    >
      <Icon name="ChevronIcon" rotate={90} size={20} />
    </Pressable>
  );
};

export default BackButton;
