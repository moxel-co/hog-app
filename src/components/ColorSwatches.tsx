import React, { useState } from 'react';
import { ColorSwatch } from '../types';
import useVariant from '../stores/useVariant';

export function ColorSwatches({ 
  swatches, 
  onSelect, 
  isDualColor,
  onClose,
  colorType 
}: { 
  swatches: ColorSwatch[];
  onSelect: (colorType: string, color: string) => void;
  isDualColor?: boolean;
  onClose?: () => void;
  colorType: string;
}) {
  const [isVisible, setIsVisible] = useState(true);
  
  // Get the current color based on colorType
  const getCurrentColor = () => {
    switch (colorType) {
      case 'Body':
        return useVariant.getState().bodyColor;
      case 'Neck':
        return useVariant.getState().neckColor;
      case 'Fretboard':
        return useVariant.getState().fretBoardColor;
      case 'Neck Binding':
        return useVariant.getState().fretBoardBindingColor;
      case 'Inlay':
        return useVariant.getState().inlayColor;
      case 'Neck Buttons':
        return useVariant.getState().neckButtonColor;
      case 'Arcade Buttons':
        return useVariant.getState().arcadeButtonColor;
      case 'Pick Guard':
        return useVariant.getState().pickGuardColor;
      case 'Hardware':
        return useVariant.getState().hardwareColor;
      case 'Strummer Side Panels':
        return useVariant.getState().strummerSideColor;
      default:
        return '';
    }
  };

  const currentColor = getCurrentColor();

  const handleClick = (event: React.MouseEvent, swatch: ColorSwatch) => {
    event.stopPropagation();
    onSelect(colorType, swatch.name);
    if (onClose) {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }
  };

  const getSwatchColor = (swatch: ColorSwatch) => {
    return swatch.color;
  };

  return (
    <div 
      className={`color-swatches ${!isVisible ? 'closing' : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="color-grid">
        {swatches.map((swatch) => (
          <button
            key={swatch.color + (swatch.secondary_color || '')}
            onClick={(e) => handleClick(e, swatch)}
            className={`color-swatch group ${swatch.name === currentColor ? 'selected' : ''}`}
            style={{
              background: swatch.color === 'rainbow' 
                ? 'linear-gradient(180deg,rgb(34, 146, 120) 0%, rgb(34, 146, 120) 20%,rgb(226, 21, 45) 20%, rgb(226, 21, 45) 40%, #ebce06 40%, #ebce06 60%, #1236a2 60%, #1236a2 80%, #fe6701 80%, #fe6701 100%)'
                : isDualColor && swatch.secondary_color 
                  ? `linear-gradient(45deg, ${swatch.color} 50%, ${swatch.secondary_color} 50%)`
                  : getSwatchColor(swatch)
            }}
          >
            <span className="color-swatch-label">
              {swatch.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}