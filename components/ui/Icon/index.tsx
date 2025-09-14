import { ViewStyle } from 'react-native';

import * as IconAssets from '@/assets/icons/index';
import colors from '@/global/colors';

export type IconT = keyof typeof IconAssets;

export type IconProps = {
  name: IconT;
  size?: number;
  style?: ViewStyle;
  color?: string;
  strokeWidth?: number;
  rotate?: number;
  fill?: string;
};

const Icon = ({
  name,
  size = 20,
  color = colors.neutral[100],
  strokeWidth = 2,
  style,
  rotate = 0,
  fill = 'none',
}: IconProps) => {
  if (name && !!IconAssets?.[name]) {
    return IconAssets[name]({
      width: size,
      height: size,
      color,
      strokeWidth,
      style,
      fill,
      transform: [
        {
          rotate: `${rotate}deg`,
        },
      ],
    });
  }
};

export default Icon;
