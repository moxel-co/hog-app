import {
  Palette,
  Joystick,
  Star,
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
} from './icons.tsx';
import { MenuItem } from '../types';
import { 
  BodyColorSwatches,
  colorSwatches,
  presetColorSwatches,
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
import { ReactNode } from 'react';

// Get current selected variants
const bodyVariants = guitarVariants.filter((variant) => variant.type === 'body');
const headstockVariants = guitarVariants.filter((variant) => variant.type === 'headstock');
const inlayVariants = guitarVariants.filter((variant) => variant.type === 'inlay');

const IsDualNeck = () => {
  const isDualNeck = useVariant((state) => state.isDualNeck);
  return isDualNeck;
}

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

const updateDynamicCamera = (targetType: string) => {
  useVariant.setState({ 
    targetType: targetType,
  });
};

const handleColorSelect = (colorType: string, color: string) => {
  switch (colorType) {
    case 'Body':
      useVariant.setState({ bodyColor: color });
      break;
    case 'Neck':
      useVariant.setState({ neckColor: color });
      break;
    case 'Fretboard':
      useVariant.setState({ fretBoardColor: color });
      break;
    case 'Neck Binding':
      useVariant.setState({ fretBoardBindingColor: color });
      break;
    case 'Inlay':
      useVariant.setState({ inlayColor: color });
      break;
    case 'Neck Buttons':
      useVariant.setState({ neckButtonColor: color });
      break;
    case 'Arcade Buttons':
      useVariant.setState({ arcadeButtonColor: color });
      break;
    case 'Pick Guard':
      useVariant.setState({ pickGuardColor: color });
      break;
    case 'Hardware':
      useVariant.setState({ hardwareColor: color });
      break;
    case 'Strummer Side Panels':
      useVariant.setState({ strummerSideColor: color });
      break;
  }
};

const ColorPickerIcon = ({ color }: { color: string }) => {
  return (
    <div style={{ color }}>
      <Palette size={24} />
    </div>
  );
};

const BodyColorIcon = () => {
  const body = useVariant((state) => state.body);
  const bodyColor = useVariant((state) => state.bodyColor);
  const variant = guitarVariants.find(v => v.id === `${body}`);
  const IconComponent = variant?.icon || BodyReliableIcon;
  return <IconComponent size={24} color={bodyColor} />;
};

const NeckColorIcon = () => {
  const color = useVariant((state) => state.neckColor);
  return <NeckIcon size={24} color={color} />;
};

const FretboardColorIcon = () => {
  const color = useVariant((state) => state.fretBoardColor);
  return <FretboardIcon size={24} color={color} />;
};

const NeckBindingColorIcon = () => {
  const color = useVariant((state) => state.fretBoardBindingColor);
  return <FretboardBindingIcon size={24} color={color} />;
};

const InlayColorIcon = () => {
  const inlay = useVariant((state) => state.inlay);
  const inlayColor = useVariant((state) => state.inlayColor);
  const variant = guitarVariants.find(v => v.id === `${inlay}`);
  const IconComponent = variant?.icon || InlaySharkfinIcon;
  return <IconComponent size={24} color={inlayColor} />;
};

const IsDualNeck2 = () => {
  const isDualNeck = useVariant((state) => state.isDualNeck);
  return isDualNeck;
};

const NeckButtonColorIcon = () => {
  const color = useVariant((state) => state.neckButtonColor);
  return <NeckButtonsIcon size={24} color={color} />;
};

const ArcadeButtonsColorIcon = () => {
  const color = useVariant((state) => state.arcadeButtonColor);
  return <Joystick color={color} />;
};

const PickGuardColorIcon = () => {
  const color = useVariant((state) => state.pickGuardColor);
  return <PickGuardIcon size={24} color={color} />;
};

const HardwareColorIcon = () => {
  const color = useVariant((state) => state.hardwareColor);
  return <HardwareIcon size={24} color={color} />;
};

const StrummerSideColorIcon = () => {
  const color = useVariant((state) => state.strummerSideColor);
  return <ColorPickerIcon color={color} />;
};

export const customiseMenuItems: MenuItem[] = [
  {
    icon: <BodyIcon /> as ReactNode,
    label: 'Body',
    items: bodyVariants.map((variant) => ({
      icon: <variant.icon size={24} color="white" />,
      label: variant.name,
      onClick: () => {
        useVariant.setState({ body: variant.id });
        useVariant.setState({ strummerOffset: variant.strummerOffset });
        useVariant.setState({ shadowOffset: variant.shadowOffset });
        useVariant.setState({ isDualNeck: variant.isDualNeck });
        useVariant.setState({ dualNeckOffsetPos: variant.dualNeckOffsetPos });
        useVariant.setState({ dualNeckOffsetRot: variant.dualNeckOffsetRot });
        updateDynamicCamera(variant.type);
      },
    })),
  },
  {
    icon: <HeadstockIcon /> as ReactNode,
    label: 'Headstock',
    items: headstockVariants.map((variant) => ({
      icon: <variant.icon size={24} color="white" />,
      label: variant.name,
      onClick: () => {
        useVariant.setState({ headstock: variant.id });
        updateDynamicCamera(variant.type);
      },
    })),
  },
  ...(useVariant.getState().isDualNeck // Check if isDualNeck is true
    ? [
        {
          icon: <HeadstockIcon2 /> as ReactNode,
          label: 'Headstock2',
          items: headstockVariants.map((variant) => ({
            icon: <variant.icon size={24} color="white" />,
            label: variant.name,
            onClick: () => {
              useVariant.setState({ headstock2: variant.id });
              updateDynamicCamera('headstock2');
            },
          })),
        },
      ]
    : []), // If false, add nothing
  {
    icon: <InlayIcon /> as ReactNode,
    label: 'Inlay',
    items: inlayVariants.map((variant) => ({
      icon: <variant.icon size={24} color="white" />,
      label: variant.name,
      onClick: () => {
        useVariant.setState({ inlay: variant.id });
        updateDynamicCamera(variant.type);
      },
    })),
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
    ],
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
        swatches: colorSwatches,
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
];