import {
  Shield,
  Palette,
  Box,
  Joystick,
  Square,
  Layers,
  Star,
} from 'lucide-react';
import {
  BodyReliableIcon,
  HeadStockReliableIcon,
  InlaySharkfinIcon,
} from './icons.tsx';
import { MenuItem } from '../types';
import { NeckButtonColorSwatches, colorSwatches, presetColorSwatches } from './colors';
import useVariant from '../stores/useVariant';
import { guitarVariants } from './guitar';
import { ReactNode } from 'react';

// Get current selected variants
const bodyVariants = guitarVariants.filter((variant) => variant.type === 'body');
const headstockVariants = guitarVariants.filter((variant) => variant.type === 'headstock');
const inlayVariants = guitarVariants.filter((variant) => variant.type === 'inlay');

// Dynamic icons for menu items based on selected variant
const HeadstockIcon = () => {
  const headstock = useVariant((state) => state.headstock);
  const variant = guitarVariants.find(v => v.id === `${headstock}`);
  const IconComponent = variant?.icon || HeadStockReliableIcon;
  return <IconComponent size={56} />;
};

const BodyIcon = () => {
  const body = useVariant((state) => state.body);
  const variant = guitarVariants.find(v => v.id === `${body}`);
  const IconComponent = variant?.icon || BodyReliableIcon;
  return <IconComponent size={56} />;
};

const InlayIcon = () => {
  const inlay = useVariant((state) => state.inlay);
  const variant = guitarVariants.find(v => v.id === `${inlay}`);
  const IconComponent = variant?.icon || InlaySharkfinIcon;
  return <IconComponent size={56} />;
};

const updateDynamicCamera = (targetType: string) => {
  useVariant.setState({ 
    targetType: targetType,
  });
};

export const customiseMenuItems: MenuItem[] = [
  {
    icon: <BodyIcon /> as ReactNode,
    label: 'Body',
    items: [
      ...bodyVariants.map((variant) => ({
        icon: <variant.icon size={24} />, 
        label: variant.name,
        onClick: () => {
          useVariant.setState({ body: variant.id });
          updateDynamicCamera(variant.type);
        },
      })),
      {
        icon: <Palette size={24} />,
        label: 'Color',
        isColorPicker: true,
        swatches: colorSwatches,
      },
    ],
  },
  {
    icon: <HeadstockIcon /> as ReactNode,
    label: 'Headstock',
    items: headstockVariants.map((variant) => ({
      icon: <variant.icon size={24} />,
      label: variant.name,
      onClick: () => {
        useVariant.setState({ headstock: variant.id });
        updateDynamicCamera(variant.type);
      },
    })),
  },
  {
    icon: <InlayIcon /> as ReactNode,
    label: 'Inlay',
    items: inlayVariants.map((variant) => ({
      icon: <variant.icon size={24} />,
      label: variant.name,
      onClick: () => {
        useVariant.setState({ inlay: variant.id });
        updateDynamicCamera(variant.type);
      },
    })),
  },
  {
    icon: <Layers size={56} />,
    label: 'Neck',
    items: [
      {
        icon: <Palette size={24} />,
        label: 'Neck Color',
        isColorPicker: true,
        swatches: colorSwatches,
      },
      {
        icon: <Palette size={24} />,
        label: 'Fretboard Color',
        isColorPicker: true,
        swatches: NeckButtonColorSwatches,
      },
    ],
  },
  {
    icon: <Joystick size={56} />,
    label: 'Buttons',
    items: [
      { 
        icon: <Star size={24} />, 
        label: 'Star Power Button',
        isToggle: true,
        id: 'starPowerButton',
      },
      {
        icon: <Palette size={24} />,
        label: 'Color',
        isColorPicker: true,
        swatches: colorSwatches,
      },
    ],
  },
  {
    icon: <Shield size={56} />,
    label: 'Pick Guard',
    items: [
      {
        icon: <Palette size={24} />,
        label: 'Color',
        isColorPicker: true,
        swatches: colorSwatches,
      },
    ],
  },
  {
    icon: <Box size={56} />,
    label: 'Hardware',
    items: [
      {
        icon: <Palette size={24} />,
        label: 'Color',
        isColorPicker: true,
        swatches: colorSwatches,
      },
    ],
  },
];