import { Image } from 'expo-image';
import { Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { LogoImg } from '@/assets';
import Button from '@/components/Button';
import { shadow } from '@/global/shadow';
import { height, width } from 'global/constants';

const Login = () => {
  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
    >
      <View
        style={{ minHeight: height, width }}
        className="items-center justify-between gap-10 px-10 py-20"
      >
        <Image
          source={LogoImg}
          style={{ width: '100%', height: 200 }}
          contentFit="contain"
        />

        <View className="w-11/12 items-center gap-3">
          <TextInput
            className="h-14 w-full rounded-xl bg-white"
            style={shadow.default}
          />

          <TextInput
            className="h-14 w-full rounded-xl bg-white"
            style={shadow.default}
          />

          <View className="w-full flex-row items-center justify-between">
            <Text className="font-poppins_medium text-sm text-neutral-60">
              Lembrar de mim
            </Text>

            <Text className="font-poppins_bold text-sm text-neutral-60">
              Esqueci a senha
            </Text>
          </View>
        </View>

        <View className="w-52 items-center gap-16">
          <Button text="ENTRAR" />

          <Text className="text-center font-poppins_bold text-sm text-neutral-60">
            Leia os termos de uso e política de privacidade
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;
