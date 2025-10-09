declare module '*.png';

declare module '*.svg' {
  import type React from 'react';
  import type { SvgProps } from 'react-native-svg';

  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.otf';

declare type TAttachment = {
  uri: string;
  name: string;
  type: string;
};

declare type TFormData = {
  append(name: string, data: TAttachment): void;
};
