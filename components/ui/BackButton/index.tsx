import { useRouter } from 'expo-router';
import {
  GestureResponderEvent,
  Keyboard,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import Icon from '../Icon';

const BackButton = ({ onPress, ...props }: TouchableOpacityProps) => {
  const router = useRouter();

  const handlePress = (e: GestureResponderEvent) => {
    Keyboard.dismiss();

    if (onPress) {
      onPress(e);
      return;
    }

    if (router.canDismiss()) {
      router.back();
    }
  };

  return (
    <TouchableOpacity
      className="h-9 w-9 items-center justify-center"
      onPress={handlePress}
      {...props}
    >
      <Icon name="LeftArrowIcon" size={20} />
    </TouchableOpacity>
  );
};

export default BackButton;
