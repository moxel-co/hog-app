import React, { useState, useEffect } from 'react';
import { ColorSwatch } from '../types';
import useVariant from '../stores/useVariant';

function calculateRadius(numColors: number, screenWidth: number): number {
  // Increased base radius by 20%
  const baseRadius = Math.max(35, Math.min(numColors * 9.33, 70));
  
  // Adjust for screen size
  if (screenWidth < 640) { // Mobile
    return baseRadius * 0.8;
  } else if (screenWidth < 1536) { // Tablet/Desktop
    return baseRadius * 1.2;
  } else if (screenWidth < 2560) { // Large Desktop
    return baseRadius * 1.5;
  } else { // 4K
    return baseRadius * 2.8;
  }
}

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
  const [isClosing, setIsClosing] = useState(false);

  const handleClick = (event: React.MouseEvent, color: string) => {
    event.stopPropagation();
    
    // Update the state based on the color type
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

    // Call the onSelect callback
    onSelect(colorType, color);

    // Handle closing animation
    if (onClose) {
      setIsClosing(true);
      setTimeout(() => {
        onClose();
      }, 300);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (onClose) {
        setIsClosing(true);
        setTimeout(() => {
          onClose();
        }, 300);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div 
      className={`color-swatches ${isClosing ? 'closing' : ''}`} 
      onClick={(e) => e.stopPropagation()}
    >
      {swatches.map((swatch, index) => {
        const angle = (index * (360 / swatches.length)) * (Math.PI / 180);
        const radius = calculateRadius(swatches.length, window.innerWidth);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <button
            key={swatch.primary_color + (swatch.secondary_color || '')}
            onClick={(e) => handleClick(e, swatch.primary_color)}
            className={`color-swatch group ${isClosing ? 'closing' : ''}`}
            style={{
              '--tx': `${x}px`,
              '--ty': `${y}px`,
              border: swatch.primary_color === '#FFFFFF' ? '1px solid #E5E7EB' : 'none',
              animationDelay: isClosing ? '0ms' : `${index * 25}ms`,
              background: isDualColor && swatch.secondary_color 
                ? `linear-gradient(45deg, ${swatch.primary_color} 50%, ${swatch.secondary_color} 50%)`
                : swatch.primary_color
            } as React.CSSProperties}
          >
            <span className="color-swatch-label">
              {swatch.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}