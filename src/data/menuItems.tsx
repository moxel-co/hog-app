import React from 'react';
import {
  Palette,
  Joystick,
  Star,
  Hand,
} from 'lucide-react';
import {
  BodyReliableIcon,
  HeadStockReliableIcon,
  InlaySharkfinIcon,
  FretboardIcon,
  FretboardBindingIcon,
  HardwareIcon,
  NeckIcon,
  NeckButtonsIcon,
  PickGuardIcon,
  StrummerSideIcon,
} from './icons.tsx';
import { MenuItem } from '../types';
import { 
  BodyColorSwatches,
  NeckColorSwatches,
  PickGuardColorSwatches,
  InlayColorSwatches,
  HardwareColorSwatches,
  NeckButtonColorSwatches,
  ArcadeButtonColorSwatches,
  FretboardColorSwatches,
  NeckBindingColorSwatches,
  StrummerSideColorSwatches
} from './colors';
import useVariant from '../stores/useVariant';
import { guitarVariants } from './guitar';
import { guitarPresets } from './presets.ts';
import { ReactNode, useMemo } from 'react';


// Get current selected variants
const bodyVariants = guitarVariants.filter((variant) => variant.type === 'body' || variant.type === 'bodyDual');
const headstockVariants = guitarVariants.filter((variant) => variant.type === 'headstock');
const inlayVariants = guitarVariants.filter((variant) => variant.type === 'inlay');
const guitarPresetVariants = guitarPresets.filter((variant) => variant.type === 'preset');

// Dynamic icons for menu items based on selected variant
const HeadstockIcon = () => {
  const headstock = useVariant((state) => state.headstock);
  const neckColor = useVariant((state) => state.neckColor);
  const variant = guitarVariants.find(v => v.id === `${headstock}`);
  const IconComponent = variant?.icon || HeadStockReliableIcon;
  return <IconComponent size={56} color={neckColor} />;
};

const HeadstockIcon2 = () => {
  const headstock = useVariant((state) => state.headstock2);
  const neckColor = useVariant((state) => state.neckColor);
  const variant = guitarVariants.find(v => v.id === `${headstock}`);
  const IconComponent = variant?.icon || HeadStockReliableIcon;
  return <IconComponent size={56} color={neckColor} />;
};

const BodyIcon = () => {
  const body = useVariant((state) => state.body);
  const bodyColor = useVariant((state) => state.bodyColor);
  const variant = guitarVariants.find(v => v.id === `${body}`);
  const IconComponent = variant?.icon || BodyReliableIcon;
  return <IconComponent size={56} color={bodyColor} />;
};

const InlayIcon = () => {
  const inlay = useVariant((state) => state.inlay);
  const inlayColor = useVariant((state) => state.inlayColor);
  const variant = guitarVariants.find(v => v.id === `${inlay}`);
  const IconComponent = variant?.icon || InlaySharkfinIcon;
  return <IconComponent size={56} color={inlayColor} />;
};

const InlayIcon2 = () => {
  const inlay = useVariant((state) => state.inlay2);
  const inlayColor = useVariant((state) => state.inlayColor);
  const variant = guitarVariants.find(v => v.id === `${inlay}`);
  const IconComponent = variant?.icon || InlaySharkfinIcon;
  return <IconComponent size={56} color={inlayColor} />;
};

const updateDynamicCamera = (targetType: string) => {
  useVariant.setState({ 
    targetType: targetType,
  });
};

const handleColorSelect = (colorType: string, color: string) => {
  switch (colorType) {
    case 'Body':
      console.log('Body color selected:', color);
      useVariant.setState({ bodyColor: color });
      useVariant.setState({ targetType: 'body' });
      break;
    case 'Neck':
      useVariant.setState({ neckColor: color });
      useVariant.setState({ targetType: 'neck' });
      break;
    case 'Fretboard':
      useVariant.setState({ fretBoardColor: color });
      useVariant.setState({ targetType: 'fretboard' });
      break;
    case 'Neck Binding':
      useVariant.setState({ fretBoardBindingColor: color });
      useVariant.setState({ targetType: 'neck' });
      break;
    case 'Inlay':
      useVariant.setState({ inlayColor: color });
      useVariant.setState({ targetType: 'inlay' });
      break;
    case 'Neck Buttons':
      useVariant.setState({ neckButtonColor: color });
      useVariant.setState({ targetType: 'neckButtons' });
      break;
    case 'Arcade Buttons':
      useVariant.setState({ arcadeButtonColor: color });
      useVariant.setState({ targetType: 'body' });
      break;
    case 'Pick Guard':
      useVariant.setState({ pickGuardColor: color });
      useVariant.setState({ targetType: 'body' });
      break;
    case 'Hardware':
      useVariant.setState({ hardwareColor: color });
      useVariant.setState({ targetType: 'default' });
      break;
    case 'Strummer Side Panels':
      useVariant.setState({ strummerSideColor: color });
      useVariant.setState({ targetType: 'body' });
      break;
  }
};

const ColorPickerIcon = ({ color }: { color: string }) => {
  return (
    <div style={{ color }}>
      <Palette size={56} />
    </div>
  );
};

const BodyColorIcon = () => {
  const body = useVariant((state) => state.body);
  const bodyColor = useVariant((state) => state.bodyColor);
  const variant = guitarVariants.find(v => v.id === `${body}`);
  const IconComponent = variant?.icon || BodyReliableIcon;
  return <IconComponent size={56} color={bodyColor} />;
};

const NeckColorIcon = () => {
  const color = useVariant((state) => state.neckColor);
  return <NeckIcon size={56} color={color} />;
};

const FretboardColorIcon = () => {
  const color = useVariant((state) => state.fretBoardColor);
  return <FretboardIcon size={56} color={color} />;
};

const NeckBindingColorIcon = () => {
  const color = useVariant((state) => state.fretBoardBindingColor);
  return <FretboardBindingIcon size={56} color={color} />;
};

const InlayColorIcon = () => {
  const inlay = useVariant((state) => state.inlay);
  const inlayColor = useVariant((state) => state.inlayColor);
  const variant = guitarVariants.find(v => v.id === `${inlay}`);
  const IconComponent = variant?.icon || InlaySharkfinIcon;
  return <IconComponent size={56} color={inlayColor} />;
};

const NeckButtonColorIcon = () => {
  const color = useVariant((state) => state.neckButtonColor);
  return <NeckButtonsIcon size={56} color={color} />;
};

const ArcadeButtonsColorIcon = () => {
  const color = useVariant((state) => state.arcadeButtonColor);
  return <Joystick size={56} color={color} />;
};

const PickGuardColorIcon = () => {
  const color = useVariant((state) => state.pickGuardColor);
  return <PickGuardIcon size={56} color={color} />;
};

const HardwareColorIcon = () => {
  const color = useVariant((state) => state.hardwareColor);
  return <HardwareIcon size={56} color={color} />;
};

const StrummerSideColorIcon = () => {
  const color = useVariant((state) => state.strummerSideColor);
  return <StrummerSideIcon size={56} color={color} />;
};

// Create a custom hook that returns the customiseMenuItems array
export const useCustomiseMenuItems = (): MenuItem[] => {
  // Get the states from the useVariant store
  const isDualNeck = useVariant((state) => state.isDualNeck);
  const body = useVariant((state) => state.body);
  const headstock = useVariant((state) => state.headstock);
  const headstock2 = useVariant((state) => state.headstock2);
  const inlay = useVariant((state) => state.inlay);
  const inlay2 = useVariant((state) => state.inlay2);
  const starPowerButton = useVariant((state) => state.starPowerButton);
  const isLeftHandOrientation = useVariant((state) => state.isLeftHandOrientation);

  // Use useMemo to memoize the array and only recreate it when states change
  return useMemo(() => [
    {
      icon: <Palette size={56} />,
      label: 'Presets',
      items: guitarPresetVariants.map((variant) => ({
        icon: <variant.icon size={56} color="white" />,
        label: variant.name,
        onClick: () => {
          useVariant.setState({ body: variant.body });
          useVariant.setState({ headstock: variant.headstock });
          useVariant.setState({ headstock2: variant.headstock2 });
          useVariant.setState({ inlay: variant.inlay });
          useVariant.setState({ inlay2: variant.inlay2 });
          useVariant.setState({ bodyColor: variant.bodyColor });
          useVariant.setState({ neckColor: variant.neckColor });
          useVariant.setState({ neckButtonColor: variant.neckButtonColor });
          useVariant.setState({ pickGuardColor: variant.pickguardColor });
          useVariant.setState({ fretBoardColor: variant.fretboardColor });
          useVariant.setState({ arcadeButtonColor: variant.arcadeButtonColor });
          useVariant.setState({ hardwareColor: variant.hardwareColor });
          useVariant.setState({ isDualNeck: variant.isDualNeck });
          useVariant.setState({ strummerOffset: variant.strummerOffset });
          updateDynamicCamera("default");
        },
        isActive: body === variant.id,
      })),
    },
    {
      icon: <BodyIcon /> as ReactNode,
      label: 'Body',
      items: bodyVariants.map((variant) => ({
        icon: <variant.icon size={56} color="white" />,
        label: variant.name,
        onClick: () => {
          useVariant.setState({ body: variant.id });
          useVariant.setState({ strummerOffset: variant.strummerOffset });
          useVariant.setState({ shadowOffset: variant.shadowOffset });
          useVariant.setState({ isDualNeck: variant.isDualNeck });
          useVariant.setState({ dualNeckOffsetPos: variant.dualNeckOffsetPos });
          useVariant.setState({ dualNeckOffsetRot: variant.dualNeckOffsetRot });
          useVariant.setState({ dualNeckOffsetPosLeft: variant.dualNeckOffsetPosLeft });
          useVariant.setState({ dualNeckOffsetRotLeft: variant.dualNeckOffsetRotLeft });
          updateDynamicCamera(variant.type);
        },
        isActive: body === variant.id,
      })),
    },
    {
      icon: <HeadstockIcon /> as ReactNode,
      label: 'Headstock',
      items: headstockVariants.map((variant) => ({
        icon: <variant.icon size={56} color="white" />,
        label: variant.name,
        onClick: () => {
          useVariant.setState({ headstock: variant.id });
          updateDynamicCamera(variant.type);
        },
        isActive: headstock === variant.id,
      })),
    },
    // Conditionally include the Headstock2 menu item based on isDualNeck
    ...(isDualNeck
      ? [
          {
            icon: <HeadstockIcon2 /> as ReactNode,
            label: 'Headstock2',
            items: headstockVariants.map((variant) => ({
              icon: <variant.icon size={56} color="white" />,
              label: variant.name,
              onClick: () => {
                useVariant.setState({ headstock2: variant.id });
                updateDynamicCamera('headstock2');
              },
              isActive: headstock2 === variant.id,
            })),
          },
        ]
      : []), // If false, add nothing
    {
      icon: <InlayIcon /> as ReactNode,
      label: 'Inlay',
      items: inlayVariants.map((variant) => ({
        icon: <variant.icon size={56} color="white" />,
        label: variant.name,
        onClick: () => {
          useVariant.setState({ inlay: variant.id });
          updateDynamicCamera(variant.type);
        },
        isActive: inlay === variant.id,
      })),
    },
    {
      icon: <Star size={56} />,
      label: 'Star Power',
      isToggle: true,
      id: 'starPowerButton',
      active: starPowerButton,
    },
    {
      icon: <Hand size={56} />,
      label: 'Left Hand Orientation',
      isToggle: true,
      id: 'leftHandOrientation',
      active: isLeftHandOrientation,
    },
    // Conditionally include the Inlay2 menu item based on isDualNeck
    ...(isDualNeck
      ? [
          {
            icon: <InlayIcon2 /> as ReactNode,
            label: 'Inlay2',
            items: inlayVariants.map((variant) => ({
              icon: <variant.icon size={56} color="white" />,
              label: variant.name,
              onClick: () => {
                useVariant.setState({ inlay2: variant.id });
                updateDynamicCamera("inlay2");
              },
              isActive: inlay2 === variant.id,
            })),
          },
        ]
      : []), // If false, add nothing
    {
      icon: <Palette size={56} />,
      label: 'Colors',
      items: [
        {
          icon: <BodyColorIcon />,
          label: 'Body',
          isColorPicker: true,
          swatches: BodyColorSwatches,
          onColorSelect: (color: string) => handleColorSelect('Body', color),
        },
        {
          icon: <NeckColorIcon />,
          label: 'Neck',
          isColorPicker: true,
          swatches: NeckColorSwatches,
          onColorSelect: (color: string) => handleColorSelect('Neck', color),
        },
        {
          icon: <FretboardColorIcon />,
          label: 'Fretboard',
          isColorPicker: true,
          swatches: FretboardColorSwatches,
          onColorSelect: (color: string) => handleColorSelect('Fretboard', color),
        },
        {
          icon: <NeckBindingColorIcon />,
          label: 'Neck Binding',
          isColorPicker: true,
          swatches: NeckBindingColorSwatches,
          onColorSelect: (color: string) => handleColorSelect('Neck Binding', color),
        },
        {
          icon: <InlayColorIcon />,
          label: 'Inlay',
          isColorPicker: true,
          swatches: InlayColorSwatches,
          onColorSelect: (color: string) => handleColorSelect('Inlay', color),
        },
        {
          icon: <NeckButtonColorIcon />,
          label: 'Neck Buttons',
          isColorPicker: true,
          swatches: NeckButtonColorSwatches,
          onColorSelect: (color: string) => handleColorSelect('Neck Buttons', color),
        },
        {
          icon: <ArcadeButtonsColorIcon />,
          label: 'Arcade Buttons',
          isColorPicker: true,
          swatches: ArcadeButtonColorSwatches,
          onColorSelect: (color: string) => handleColorSelect('Arcade Buttons', color),
        },
        {
          icon: <PickGuardColorIcon />,
          label: 'Pick Guard',
          isColorPicker: true,
          swatches: PickGuardColorSwatches,
          onColorSelect: (color: string) => handleColorSelect('Pick Guard', color),
        },
        {
          icon: <HardwareColorIcon />,
          label: 'Hardware',
          isColorPicker: true,
          swatches: HardwareColorSwatches,
          onColorSelect: (color: string) => handleColorSelect('Hardware', color),
        },
        {
          icon: <StrummerSideColorIcon />,
          label: 'Strummer Side Panels',
          isColorPicker: true,
          swatches: StrummerSideColorSwatches,
          onColorSelect: (color: string) => handleColorSelect('Strummer Side Panels', color),
        },
      ],
    },
  ], [isDualNeck, body, headstock, headstock2, inlay, inlay2, starPowerButton, isLeftHandOrientation]); // Recreate the array when any of these states change
};