import { zodResolver } from '@hookform/resolvers/zod';
import { updateId } from 'expo-updates';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import Animated, { LinearTransition } from 'react-native-reanimated';

import Button from '@/components/Ui/Button';
import Checkbox from '@/components/Ui/Checkbox';
import Input from '@/components/Ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { LoginForm, LoginSchema } from '@/validation/Login.validation';
import { height, width } from 'global/constants';

const Login = () => {
  const { login, logout } = useAuth();
  const [showUpdateId, setShowUpdateId] = useState(false);
  const { control, handleSubmit, setValue, watch } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  });

  const toggleStayConnected = () => {
    setValue('requestRefresh', !watch('requestRefresh'));
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
    >
      <View
        style={{ minHeight: height, width }}
        className="items-center justify-center gap-3 p-6"
      >
        <Input
          control={control}
          name="identifier"
          placeholder="E-mail"
          keyboardType="email-address"
          label="E-mail"
        />

        <Input
          control={control}
          name="password"
          password
          placeholder="Senha"
          label="Senha"
        />

        <Animated.View
          layout={LinearTransition}
          className="w-full flex-row items-center gap-2"
        >
          <Checkbox
            isChecked={watch('requestRefresh')}
            onPress={toggleStayConnected}
          />

          <Text className="text-base text-neutral-60">Lembrar de mim</Text>
        </Animated.View>

        <Button text="ENTRAR" onPress={handleSubmit(login)} />

        <TouchableOpacity
          className="absolute bottom-8 h-4 w-full items-center justify-center"
          onPress={() => setShowUpdateId(!showUpdateId)}
        >
          {showUpdateId && (
            <Text className="text-xs text-neutral-100">{updateId}</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;
