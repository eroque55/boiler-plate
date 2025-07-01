import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { LogoImg } from '@/assets';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
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
  }, [finishedAnimation]);

  return (
    <View className="flex-1">
      <Animated.View
        entering={FadeIn.delay(500).duration(800)}
        className="flex-1 items-center justify-center"
      >
        <Image
          source={LogoImg}
          style={{ width: '80%', height: '100%' }}
          contentFit="contain"
        />
      </Animated.View>
    </View>
  );
};

export default Index;
