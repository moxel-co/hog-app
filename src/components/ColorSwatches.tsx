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

  const handleClick = (event: React.MouseEvent, color: string) => {
    event.stopPropagation();
    onSelect(colorType, color);
    if (onClose) {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }
  };

  return (
    <div 
      className={`color-swatches ${!isVisible ? 'closing' : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="color-grid">
        {swatches.map((swatch) => (
          <button
            key={swatch.primary_color + (swatch.secondary_color || '')}
            onClick={(e) => handleClick(e, swatch.primary_color)}
            className={`color-swatch group ${swatch.primary_color === currentColor ? 'selected' : ''}`}
            style={{
              border: swatch.primary_color === currentColor 
                ? '1px solid rgba(255, 255, 255, 0.4)'
                : swatch.primary_color === '#FFFFFF' 
                  ? '1px solid #E5E7EB' 
                  : 'none',
              background: swatch.primary_color === 'rainbow' 
                ? 'linear-gradient(180deg, green 0 20%, red 20% 40%, yellow 40% 60%, blue 60% 80%, orange 80% 100%)'
                : isDualColor && swatch.secondary_color 
                  ? `linear-gradient(45deg, ${swatch.primary_color} 50%, ${swatch.secondary_color} 50%)`
                  : swatch.primary_color
            }}
          >
            <span className="color-swatch-label">
              {swatch.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}