import '@/global/global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setDefaultOptions } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast, { ErrorToast, ToastConfig } from 'react-native-toast-message';

import { DefaultModal } from '@/components/ui';
import {
  AuthProvider,
  DefaultModalProvider,
  DropdownProvider,
  useAuth,
} from '@/contexts';
import { colors } from '@/global/colors';
import { useDimensions, useUpdate } from '@/hooks/common';
import { handleError } from '@/utils/handleError';

export { ErrorBoundary } from '@/components/ui/ErrorBoundary';

setDefaultOptions({ locale: ptBR });

const toastConfig: ToastConfig = {
  error: props => <ErrorToast {...props} text1NumberOfLines={2} />,
};

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 20000,
      retry: false,
      initialDataUpdatedAt: 0,
    },
    mutations: {
      onError: handleError,
    },
  },
});

const ProtectedStack = () => {
  const { user } = useAuth();
  const { insets } = useDimensions();

  return (
    <Stack
      screenOptions={{
        animation: 'fade',
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.neutral.background,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      }}
    >
      <Stack.Protected guard={!user}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(main)" />
      </Stack.Protected>
    </Stack>
  );
};

const RootLayout = () => {
  const isLoading = useUpdate();
  const [fontsLoaded] = useFonts({});

  const isAppReady = !isLoading && fontsLoaded;

  if (!isAppReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <AuthProvider isAppReady={isAppReady}>
              <DefaultModalProvider>
                <DropdownProvider>
                  <StatusBar style="auto" />

                  <ProtectedStack />

                  <DefaultModal />

                  <Toast config={toastConfig} />
                </DropdownProvider>
              </DefaultModalProvider>
            </AuthProvider>
          </SafeAreaProvider>
        </QueryClientProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
