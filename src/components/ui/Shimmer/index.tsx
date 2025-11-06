import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { colors } from '@/global/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral[100],
    overflow: 'hidden',
  },
  animatedWrapper: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
  },
});

type Props = {
  width?: number;
  height?: number;
  borderRadius?: number;
};

const Shimmer = ({ width, height, borderRadius = 2 }: Props) => {
  const { width: screenWidth } = useWindowDimensions();
  const translateX = useSharedValue(-screenWidth);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(screenWidth, { duration: 2000, easing: Easing.linear }),
      -1,
      false,
    );
  }, [screenWidth]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: width || '100%',
          height: height || '100%',
          borderRadius,
        },
      ]}
    >
      <Animated.View style={[styles.animatedWrapper, animatedStyle]}>
        <LinearGradient
          colors={[
            colors.transparent,
            'rgba(255, 255, 255, 0.7)',
            colors.transparent,
          ]}
          end={{ x: 0, y: 0 }}
          locations={[0.35, 0.5, 0.65]}
          start={{ x: 1, y: 0.5 }}
          style={styles.gradient}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default Shimmer;
