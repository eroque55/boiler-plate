import '@/global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setDefaultOptions } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Toast, { ErrorToast } from 'react-native-toast-message';

import AuthProvider from '@/hooks/useAuth';
import useUpdate from '@/hooks/useUpdate';

export { ErrorBoundary } from '@/components/ErrorBoundary';

const toastConfig = {
  error: (props: any) => <ErrorToast {...props} text1NumberOfLines={2} />,
};

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
  const isLoading = useUpdate();
  const [fontsLoaded] = useFonts({});

  const isAppReady = !isLoading && fontsLoaded;

  if (!isAppReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider isAppReady={isAppReady}>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <StatusBar style="auto" />

              <Slot />

              <Toast config={toastConfig} />
            </SafeAreaView>
          </SafeAreaProvider>
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default App;
