import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { useAuth } from '@/hooks/useAuth';

const Intro = () => {
  const { isAuthenticated } = useAuth();
  const [finishedAnimation, setFinishedAnimation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setFinishedAnimation(true);
    }, 3000);
  }, []);

  useEffect(() => {
    if (finishedAnimation) {
      if (isAuthenticated) {
        router.replace('/(main)/Home');
      } else {
        router.replace('/(auth)/Login');
      }
    }
  }, [finishedAnimation, isAuthenticated, router]);

  return (
    <View className="flex-1">
      <Animated.View
        entering={FadeIn.delay(500).duration(800)}
        className="flex-1 items-center justify-center"
      >
        <View className="aspect-square w-[80%] bg-black" />
      </Animated.View>
    </View>
  );
};

export default Intro;
