import { PropsWithChildren } from 'react';
import {
  KeyboardAwareScrollView as KASV,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-controller';

const KeyboardAwareScrollView = ({
  children,
  ...props
}: PropsWithChildren<KeyboardAwareScrollViewProps>) => {
  return (
    <KASV
      extraKeyboardSpace={-50}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      {...props}
    >
      {children}
    </KASV>
  );
};

export default KeyboardAwareScrollView;
