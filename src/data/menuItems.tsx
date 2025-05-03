import React from 'react';
import {
  Palette,
  Guitar,
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
  HandLeftIcon,
  HandRightIcon
} from './icons.tsx';
import { MenuItem } from '../types';
import { 
  BodyColorSwatches,
  NeckColorSwatches,
  HeadstockColorSwatches,
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
  const headstockColorState = useVariant((state) => state.headstockColor);
  const headstockColor = HeadstockColorSwatches.find((color) => color.name === headstockColorState);
  const variant = guitarVariants.find(v => v.id === `${headstock}`);
  const IconComponent = variant?.icon || HeadStockReliableIcon;
  return <IconComponent size={56} color={headstockColor.color} />;
};

const HeadstockIcon2 = () => {
  const headstock = useVariant((state) => state.headstock2);
  const headstockColorState = useVariant((state) => state.headstockColor);
  const headstockColor = HeadstockColorSwatches.find((color) => color.name === headstockColorState);
  const variant = guitarVariants.find(v => v.id === `${headstock}`);
  const IconComponent = variant?.icon || HeadStockReliableIcon;
  return <IconComponent size={56} color={headstockColor.color} />;
};

const BodyIcon = () => {
  const body = useVariant((state) => state.body);
  const bodyColorState = useVariant((state) => state.bodyColor);
  const bodyColor = BodyColorSwatches.find((color) => color.name === bodyColorState);
  const variant = guitarVariants.find(v => v.id === `${body}`);
  const IconComponent = variant?.icon || BodyReliableIcon;
  return <IconComponent size={56} color={bodyColor.color} />;
};

const InlayIcon = () => {
  const inlay = useVariant((state) => state.inlay);
  const inlayColorState = useVariant((state) => state.inlayColor);
  const inlayColor = InlayColorSwatches.find((color) => color.name === inlayColorState);
  const variant = guitarVariants.find(v => v.id === `${inlay}`);
  const IconComponent = variant?.icon || InlaySharkfinIcon;
  return <IconComponent size={56} color={inlayColor.color} />;
};

const InlayIcon2 = () => {
  const inlay = useVariant((state) => state.inlay2);
  const inlayColorState = useVariant((state) => state.inlayColor);
  const inlayColor = InlayColorSwatches.find((color) => color.name === inlayColorState);
  const variant = guitarVariants.find(v => v.id === `${inlay}`);
  const IconComponent = variant?.icon || InlaySharkfinIcon;
  return <IconComponent size={56} color={inlayColor.color} />;
};

const updateDynamicCamera = (targetType: string) => {
  useVariant.setState({ 
    targetType: targetType,
  });
};

const BodyColorIcon = () => {
  const body = useVariant((state) => state.body);
  const bodyColorState = useVariant((state) => state.bodyColor);
  const bodyColor = BodyColorSwatches.find((color) => color.name === bodyColorState);
  const variant = guitarVariants.find(v => v.id === `${body}`);
  const IconComponent = variant?.icon || BodyReliableIcon;
  return <IconComponent size={56} color={bodyColor.color} />;
};

const NeckColorIcon = () => {
  const neckColorState = useVariant((state) => state.neckColor);
  const neckColor = NeckColorSwatches.find((color) => color.name === neckColorState);
  return <NeckIcon size={56} color={neckColor.color} />;
};

const HeadstockColorIcon = () => {
  const headstock = useVariant((state) => state.headstock);
  const headstockColorState = useVariant((state) => state.headstockColor);
  const headstockColor = HeadstockColorSwatches.find((color) => color.name === headstockColorState);
  const variant = guitarVariants.find(v => v.id === `${headstock}`);
  const IconComponent = variant?.icon || HeadStockArrowIcon;
  return <IconComponent size={56} color={headstockColor.color} />;
}

const FretboardColorIcon = () => {
  const fretBoardColorState = useVariant((state) => state.fretBoardColor);
  const fretBoardColor = FretboardColorSwatches.find((color) => color.name === fretBoardColorState);
  return <FretboardIcon size={56} color={fretBoardColor.color} />;
};

const NeckBindingColorIcon = () => {
  const color = useVariant((state) => state.fretBoardBindingColor);
  return <FretboardBindingIcon size={56} color={color} />;
};

const InlayColorIcon = () => {
  const inlay = useVariant((state) => state.inlay);
  const inlayColorState = useVariant((state) => state.inlayColor);
  const inlayColor = InlayColorSwatches.find((color) => color.name === inlayColorState);
  const variant = guitarVariants.find(v => v.id === `${inlay}`);
  const IconComponent = variant?.icon || InlaySharkfinIcon;
  return <IconComponent size={56} color={inlayColor.color} />;
};

const NeckButtonColorIcon = () => {
  const neckButtonColorState = useVariant((state) => state.neckButtonColor);
  const neckButtonColor = NeckButtonColorSwatches.find((color) => color.name === neckButtonColorState);
  return <NeckButtonsIcon size={56} color={neckButtonColor.color} />;
};

const ArcadeButtonsColorIcon = () => {
  const arcadeButtonColorState = useVariant((state) => state.arcadeButtonColor);
  const arcadeButtonColor = ArcadeButtonColorSwatches.find((color) => color.name === arcadeButtonColorState);
  return <Joystick size={56} color={arcadeButtonColor.color} />;
};

const PickGuardColorIcon = () => {
  const pickGuardColorState = useVariant((state) => state.pickGuardColor);
  const pickGuardColor = PickGuardColorSwatches.find((color) => color.name === pickGuardColorState);
  return <PickGuardIcon size={56} color={pickGuardColor.color} />;
};

const HardwareColorIcon = () => {
  const hardwareColorState = useVariant((state) => state.hardwareColor);
  const hardwareColor = HardwareColorSwatches.find((color) => color.name === hardwareColorState);
  return <HardwareIcon size={56} color={hardwareColor.color} />;
};

const StrummerSideColorIcon = () => {
  const strummerSideColorState = useVariant((state) => state.strummerSideColor);
  const strummerSideColor = StrummerSideColorSwatches.find((color) => color.name === strummerSideColorState);
  return <StrummerSideIcon size={56} color={strummerSideColor.color} />;
};

// Create a custom hook that returns the customiseMenuItems array
export const useCustomiseMenuItems = (): MenuItem[] => {
  const preset = useVariant((state) => state.preset);
  const isDualNeck = useVariant((state) => state.isDualNeck);
  const body = useVariant((state) => state.body);
  const headstock = useVariant((state) => state.headstock);
  const headstock2 = useVariant((state) => state.headstock2);
  const inlay = useVariant((state) => state.inlay);
  const inlay2 = useVariant((state) => state.inlay2);
  const starPowerButton = useVariant((state) => state.starPowerButton);
  const isLeftHandOrientation = useVariant((state) => state.isLeftHandOrientation);

  return useMemo(() => [
    {
      icon: <Guitar size={56} />,
      label: 'Presets',
      items: guitarPresetVariants.map((variant) => ({
        icon: <variant.icon size={56} color="white" />,
        label: variant.name,
        onClick: () => {
          useVariant.setState({
            preset: variant.id,
            body: variant.body,
            headstock: variant.headstock,
            headstock2: variant.headstock2,
            inlay: variant.inlay,
            inlay2: variant.inlay2,
            starPowerButton: variant.starPowerButton,
            bodyColor: variant.bodyColor,
            neckColor: variant.neckColor,
            headstockColor: variant.headstockColor,
            fretBoardColor: variant.fretBoardColor,
            fretBoardBindingColor: variant.fretBoardBindingColor,
            pickGuardColor: variant.pickGuardColor,
            hardwareColor: variant.hardwareColor,
            inlayColor: variant.inlayColor,
            neckButtonColor: variant.neckButtonColor,
            arcadeButtonColor: variant.arcadeButtonColor,
            strummerSideColor: variant.strummerSideColor,
            isDualNeck: variant.isDualNeck,
            strummerOffset: variant.strummerOffset,
            shadowOffset: variant.shadowOffset,
            offsetPos: variant.offsetPos,
            neckOffsetPosLeft: variant.neckOffsetPosLeft,
            neckOffsetRotLeft: variant.neckOffsetRotLeft,
            dualNeckOffsetPos: variant.dualNeckOffsetPos,
            dualNeckOffsetRot: variant.dualNeckOffsetRot,
            dualNeckOffsetPosLeft: variant.dualNeckOffsetPosLeft,
            dualNeckOffsetRotLeft: variant.dualNeckOffsetRotLeft,
          });
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
          useVariant.setState({
            body: variant.id,
            strummerOffset: variant.strummerOffset,
            shadowOffset: variant.shadowOffset,
            isDualNeck: variant.isDualNeck,
            offsetPos: variant.offsetPos,
            neckOffsetPosLeft: variant.neckOffsetPosLeft,
            neckOffsetRotLeft: variant.neckOffsetRotLeft,
            dualNeckOffsetPos: variant.dualNeckOffsetPos,
            dualNeckOffsetRot: variant.dualNeckOffsetRot,
            dualNeckOffsetPosLeft: variant.dualNeckOffsetPosLeft,
            dualNeckOffsetRotLeft: variant.dualNeckOffsetRotLeft,
          });
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
                updateDynamicCamera(variant.type);
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
                updateDynamicCamera(variant.type);
              },
              isActive: inlay2 === variant.id,
            })),
          },
        ]
      : []), // If false, add nothing
    {
      icon: <Star size={56} />,
      label: 'Star Power',
      isToggle: true,
      id: 'starPowerButton',
      active: starPowerButton,
    },
    {
      icon: isLeftHandOrientation ? <HandLeftIcon size={56} /> : <HandRightIcon size={56} />,
      label: 'Hand Orientation',
      isToggle: false,
      id: 'leftHandOrientation',
      active: isLeftHandOrientation,
    },
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
          icon: <HeadstockColorIcon />,
          label: 'Headstock',
          isColorPicker: true,
          swatches: HeadstockColorSwatches,
          onColorSelect: (color: string) => handleColorSelect('Headstock', color),
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
  ], [preset, isDualNeck, body, headstock, headstock2, inlay, inlay2, starPowerButton, isLeftHandOrientation]);
};