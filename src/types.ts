import { ReactNode } from 'react';

export interface ColorSwatch {
  color: string;
  secondary_color?: string;
  name: string;
  metalness?: number;
}

export interface GuitarVariant {
  id: string;
  name: string;
  type: 'headstock' | 'body' | 'inlay';
  icon: ReactNode;
  strummerOffset: number;
  shadowOffset: number;
  isDualNeck?: boolean;
  offsetPos: number[];
  neckOffsetPosLeft: number[];
  neckOffsetRotLeft: number[];
  dualNeckOffsetPos: number[];
  dualNeckOffsetRot: number[];
  dualNeckOffsetPosLeft: number[];
  dualNeckOffsetRotLeft: number[];
}

export interface GuitarPresets {
  id: string;
  name: string;
  type: 'preset';
  icon: ReactNode;
  body: string;
  headstock: string;
  headstock2?: string;
  inlay: string;
  inlay2?: string;
  bodyColor: string;
  neckColor: string;
  headstockColor: string;
  neckButtonColor?: string;
  pickguardColor?: string;
  fretboardColor?: string;
  arcadeButtonColor?: string;
  hardwareColor: string;
  isDualNeck: boolean;
  strummerOffset: number;
  shadowOffset: number;
  offsetPos: number[];
  neckOffsetPosLeft: number[];
  neckOffsetRotLeft: number[];
  dualNeckOffsetPos: number[];
  dualNeckOffsetRot: number[];
  dualNeckOffsetPosLeft: number[];
  dualNeckOffsetRotLeft: number[];
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