import '@/global.css';

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
  useFonts,
} from '@expo-google-fonts/poppins';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setDefaultOptions } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import toastConfig from '@/components/Toast';
import ToastOverlay from '@/components/ToastOverlay';
import AuthProvider from '@/hooks/useAuth';
import useUpdate from '@/hooks/useUpdate';

export { ErrorBoundary } from '@/components/ErrorBoundary';

setDefaultOptions({ locale: ptBR });

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 20000,
      retry: false,
      initialDataUpdatedAt: 0,
    },
  },
});

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [isToastVisible, setToastIsVisible] = useState(false);
  const isLoading = useUpdate();
  const { top, bottom, left, right } = useSafeAreaInsets();
  const { height } = Dimensions.get('screen');
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  const isAppReady = !isLoading && fontsLoaded;

  if (!isAppReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider isAppReady={isAppReady}>
            <SafeAreaProvider>
              <StatusBar style="auto" />

              <Stack
                screenOptions={{
                  animation: 'fade',
                  animationDuration: 300,
                  headerShown: false,
                  contentStyle: {
                    backgroundColor: '#F5F7F9',
                    paddingTop: top,
                    paddingBottom: bottom,
                    paddingLeft: left,
                    paddingRight: right,
                  },
                }}
              />

              <ToastOverlay isVisible={isToastVisible} />

              <View className="z-50">
                <Toast
                  onHide={() => setToastIsVisible(false)}
                  onShow={() => setToastIsVisible(true)}
                  config={toastConfig}
                  position="bottom"
                  bottomOffset={height / 2}
                  autoHide={false}
                />
              </View>
            </SafeAreaProvider>
          </AuthProvider>
        </QueryClientProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
};

export default App;
