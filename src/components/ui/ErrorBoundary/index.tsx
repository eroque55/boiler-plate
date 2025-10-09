import { ErrorBoundaryProps, Link } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Pressable from '../Pressable';

const StackTrace = ({ error }: { error: Error }) => {
  return (
    <ScrollView
      className="my-2 border border-white/50"
      contentContainerClassName="p-3"
    >
      <Text className="text-white">{error.stack}</Text>
    </ScrollView>
  );
};

export const ErrorBoundary = ({ error, retry }: ErrorBoundaryProps) => {
  return (
    <View className="flex-1 items-stretch justify-center bg-black p-6">
      <SafeAreaView className="mx-auto max-h-[720px] flex-1">
        <View className="mb-12 flex-row flex-wrap items-center justify-between">
          <Text className="mb-3 text-4xl font-bold text-white">
            Algo deu errado
          </Text>

          <View className="flex-row items-center">
            <Pressable onPress={retry}>
              <View className="border-2 border-white px-6 py-3">
                <Text className="text-lg font-bold text-white">Recarregar</Text>
              </View>
            </Pressable>
          </View>
        </View>

        <StackTrace error={error} />

        {process.env.NODE_ENV === 'development' && (
          <Link
            className="text-center text-sm text-white/40 underline decoration-solid"
            href={'/_sitemap' as '/'}
          >
            Sitemap
          </Link>
        )}
      </SafeAreaView>
    </View>
  );
};
