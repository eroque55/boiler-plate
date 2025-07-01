import { Redirect } from 'expo-router';

/**
 * Redireciona para a tela de login
 */
const Root = () => {
  return <Redirect href="/(auth)/Login/" />;
};

export default Root;
