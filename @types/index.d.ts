declare module '*.png';

declare module '*.svg' {
  import type React from 'react';
  import type { SvgProps } from 'react-native-svg';

  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.otf';

interface IAttachment {
  uri: string;
  name: string;
  type: string;
}

declare interface FormData {
  append(name: string, data: IAttachment): void;
}

interface IOption {
  label: string;
  value: string | number;
}
