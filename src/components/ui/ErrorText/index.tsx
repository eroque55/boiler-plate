import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

type Props = {
  text?: string;
};

const ErrorText = ({ text }: Props) => {
  if (!text) {
    return null;
  }

  return (
    <Animated.Text
      className="font-areaextend text-xs text-alert-error-100"
      entering={FadeIn}
      exiting={FadeOut}
    >
      {text}
    </Animated.Text>
  );
};

export default ErrorText;
