import { ActivityIndicator } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { colors } from '@/global/colors';

const ButtonActivityIndicator = () => {
  return (
    <Animated.View
      className="absolute -inset-1 items-center justify-center bg-black/30"
      entering={FadeIn}
      exiting={FadeOut}
    >
      <ActivityIndicator color={colors.white} size={20} />
    </Animated.View>
  );
};

export default ButtonActivityIndicator;
