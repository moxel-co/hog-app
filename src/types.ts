import { ReactNode } from 'react';

export interface ColorSwatch {
  primary_color: string;
  secondary_color?: string;
  label: string;
}

export interface GuitarVariant {
  id: string;
  name: string;
  type: 'headstock' | 'body' | 'inlay';
  icon: ReactNode;
}

export interface MenuItem {
  icon: ReactNode;
  label: string;
  items?: MenuItem[];
  isColorPicker?: boolean;
  swatches?: ColorSwatch[];
  isDualColor?: boolean;
  subItems?: MenuItem[];
  isToggle?: boolean;
  onToggle?: () => void;
  active?: boolean;
  onClick?: () => void;
  onColorSelect?: (color: string) => void;
  id?: string;
  className?: string;
  labelClassName?: string;
}