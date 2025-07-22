// eslint-disable-next-line no-restricted-imports
import { Image as ExpoImage, ImageProps } from 'expo-image';

import colors from '@/global/colors';

const Image = ({ style, ...props }: ImageProps) => {
  return (
    <ExpoImage
      style={[{ backgroundColor: colors.neutral.placeholder }, style]}
      {...props}
    />
  );
};

export default Image;
