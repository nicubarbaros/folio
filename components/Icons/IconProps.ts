import { SVGProps } from 'react';

export type IconProps = {
  color?: string;
  size?: string | number;
  innerColor?: string;
} & SVGProps<SVGSVGElement>;
