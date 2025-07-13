import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import Button from '@/components/Ui/Button';
import colors from '@/global/colors';
import { useAuth } from '@/hooks/useAuth';
import useDefaultModal from '@/hooks/useDefaultModal';

const Home = () => {
  const { user, logout } = useAuth();
  const { openModal } = useDefaultModal();
  const router = useRouter();

  const handlePress = () => {
    openModal({
      buttonsColor: colors.alert.error.primary,
      message: 'Você deseja sair?',
      cancelText: 'Cancelar',
      confirmText: 'Sair',
      confirmAction: () => {
        logout();
        router.replace('/(auth)/Login');
      },
    });
  };

  return (
    <View className="flex-1 justify-center gap-20 p-6">
      <View>
        <Text className="text-base text-neutral-60">Bem Vindo</Text>

        <Text className="text-lg">{user?.email}</Text>
      </View>

      <Button text="Sair" onPress={handlePress} />
    </View>
  );
};

export default Home;
