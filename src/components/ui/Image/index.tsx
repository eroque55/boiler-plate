/* eslint-disable no-restricted-imports */
import { Image as ExpoImage, ImageProps } from 'expo-image';
import { PropsWithChildren, useState } from 'react';
import { View } from 'react-native';

import Shimmer from '../Shimmer';

type Props = {
  showShimmer?: boolean;
} & ImageProps;

const Image = ({
  children,
  style,
  showShimmer = false,
  className,
  ...props
}: PropsWithChildren<Props>) => {
  const [isLoading, setIsLoading] = useState(false);

  const onLoad = () => {
    setIsLoading(false);
  };

  return (
    <View className={`overflow-hidden ${className}`} style={style}>
      <ExpoImage style={{ flex: 1 }} onLoad={onLoad} {...props} />

      {isLoading && showShimmer && (
        <View className="absolute inset-0">
          <Shimmer />
        </View>
      )}

      {children}
    </View>
  );
};

export default Image;
