import React from 'react';
import { ColorSwatch } from '../types';

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
  isDualColor 
}: { 
  swatches: ColorSwatch[];
  onSelect: (color: string) => void;
  isDualColor?: boolean;
}) {
  return (
    <div className="color-swatches">
      {swatches.map((swatch, index) => {
        const angle = (index * (360 / swatches.length)) * (Math.PI / 180);
        const radius = calculateRadius(swatches.length, window.innerWidth);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <button
            key={swatch.primary_color + (swatch.secondary_color || '')}
            onClick={() => onSelect(swatch.primary_color)}
            className="color-swatch group"
            style={{
              '--tx': `${x}px`,
              '--ty': `${y}px`,
              border: swatch.primary_color === '#FFFFFF' ? '1px solid #E5E7EB' : 'none',
              animationDelay: `${index * 25}ms`,
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