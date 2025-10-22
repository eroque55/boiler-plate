import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { BackButton, Button } from '@/components/ui';
import { useAuth } from '@/contexts/useAuth';
import { useDefaultModal } from '@/store/defaultModalStore';

const Home = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { openModal } = useDefaultModal();

  const handlePress = () => {
    openModal({
      title: 'Sair?',
      message: 'Tem certeza que deseja sair?',
      cancelText: 'Cancelar',
      confirmText: 'Sair',
      onConfirm: async () => {
        await logout();
        router.replace('/(auth)/login');
      },
    });
  };

  return (
    <View className="flex-1 items-center justify-center gap-20 p-4">
      <BackButton />

      <View className="w-full">
        <Text className="text-base text-neutral-60">Bem Vindo</Text>

        <Text className="text-lg text-neutral-100">{user?.name}</Text>
      </View>

      <Button text="Sair" onPress={handlePress} />
    </View>
  );
};

export default Home;
