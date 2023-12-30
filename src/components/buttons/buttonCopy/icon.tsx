import React, { FC, ReactNode, SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  children: ReactNode;
  fill?: string;
  filled?: boolean;
  size?: number;
  height?: number;
  width?: number;
  label?: string;
}

export const Icon: FC<IconProps> = ({
  fill = 'currentColor',
  filled,
  size,
  height,
  width,
  label,
  children,
  ...props
}) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 115.77 122.88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
};