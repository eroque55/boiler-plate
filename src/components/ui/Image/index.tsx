/* eslint-disable no-restricted-imports */
import { Image as ExpoImage, ImageProps } from 'expo-image';
import { PropsWithChildren, useState } from 'react';
import { View } from 'react-native';

import Shimmer from '../Shimmer';

type Props = {
  withoutShimmer?: boolean;
} & ImageProps;

const Image = ({
  children,
  style,
  withoutShimmer,
  className,
  ...props
}: PropsWithChildren<Props>) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View className={`overflow-hidden ${className}`} style={style}>
      <ExpoImage
        style={{ flex: 1 }}
        onDisplay={() => setIsLoading(false)}
        {...props}
      />

      {isLoading && !withoutShimmer && (
        <View className="absolute inset-0">
          <Shimmer />
        </View>
      )}

      {children}
    </View>
  );
};

export default Image;
