import { ViewStyle } from 'react-native';

import * as Icon from '@/assets/index';
import colors from '@/global/colors';

export type IconT = keyof typeof Icon;

export interface IconComponentProps {
  name: IconT;
  size?: number;
  style?: ViewStyle;
  color?: string;
  strokeWidth?: number;
  rotate?: number;
  fill?: string;
}

export const IconComponent = ({
  name,
  size,
  color = colors.neutral[100],
  strokeWidth = 2,
  style,
  rotate = 0,
  fill = 'none',
}: IconComponentProps) => {
  if (name && !!Icon?.[name]) {
    return Icon[name]({
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
