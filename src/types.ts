import { ReactNode } from 'react';

export interface ColorSwatch {
  primary_color: string;
  secondary_color?: string;
  label: string;
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
}