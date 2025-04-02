import React, { useState, useRef, useEffect } from 'react';
import { Settings, Rotate3d, Hammer, Home, Palette, ShoppingCart, PackagePlus, Sparkles, SwitchCamera } from 'lucide-react';
import { customiseMenuItems } from './data/menuItems';
import { MenuItem } from './types';
import { ColorSwatches } from './components/ColorSwatches';
import useVariant from './stores/useVariant';

function SubMenuItem({ item, parentOpen }: { 
  item: MenuItem;
  parentOpen: boolean;
}) {
  const [activeColorPicker, setActiveColorPicker] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const starPowerButton = useVariant((state) => state.starPowerButton);
  const isRotationEnabled = useVariant((state) => state.isRotationEnabled);
  const isDynamicViewEnabled = useVariant((state) => state.isDynamicViewEnabled);
  const isPostEffectsEnabled = useVariant((state) => state.isPostEffectsEnabled);

  useEffect(() => {
    if (!parentOpen) {
      setIsOpen(false);
      setActiveColorPicker(null);
    }
  }, [parentOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveColorPicker(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleColorSelect = (colorType: string, color: string) => {
    if (item.onColorSelect) {
      item.onColorSelect(color);
    }
    setActiveColorPicker(null);
  };

  const handleItemClick = (subItem: MenuItem) => {
    if (subItem.isColorPicker) {
      const colorPickerId = `${item.label}-${subItem.label}`;
      setActiveColorPicker(activeColorPicker === colorPickerId ? null : colorPickerId);
    } else if (subItem.isToggle) {
      switch (subItem.id) {
        case 'starPowerButton':
          useVariant.setState({ starPowerButton: !starPowerButton });
          useVariant.setState({ targetType: "body" });
          break;
        case 'rotation':
          useVariant.setState({ isRotationEnabled: !isRotationEnabled });
          break;
        case 'dynamicView':
          useVariant.setState({ isDynamicViewEnabled: !isDynamicViewEnabled });
          break;
        case 'postEffects':
          useVariant.setState({ isPostEffectsEnabled: !isPostEffectsEnabled });
          break;
      }
    } else if (subItem.onClick) {
      subItem.onClick();
    }
  };

  const shouldUseGrid = item.items && item.items.length > 4;

  const getToggleState = (subItem: MenuItem) => {
    if (!subItem.isToggle || !subItem.id) return false;
    switch (subItem.id) {
      case 'starPowerButton': return starPowerButton;
      case 'rotation': return isRotationEnabled;
      case 'dynamicView': return isDynamicViewEnabled;
      case 'postEffects': return isPostEffectsEnabled;
      default: return subItem.active || false;
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="menu-button"
      >
        <div className="menu-button-icon">
          {item.icon}
        </div>
        <div className="menu-button-hover">
          <div className="menu-button-background" />
          <span className="menu-button-label">
            {item.label}
          </span>
        </div>
      </button>
      
      {item.items && isOpen && (
        <div className={`submenu-container ${shouldUseGrid ? "grid-layout" : "flex gap-1.35 md:gap-1.8 2xl:gap-2.7 4xl:gap-8.1"}`}>
          {item.items.map((subItem, index) => {
            const colorPickerId = `${item.label}-${subItem.label}`;
            const isColorPickerActive = activeColorPicker === colorPickerId;
            const shouldFadeOut = activeColorPicker !== null && !isColorPickerActive;

            return (
              <div 
                key={index} 
                className={`submenu-item ${shouldFadeOut ? 'fade-out' : ''}`}
              >
                <div className={subItem.labelClassName || "submenu-label"}>
                  {subItem.label}
                </div>
                <button
                  className={`${subItem.className || "submenu-button"} ${
                    subItem.isToggle 
                      ? getToggleState(subItem)
                        ? 'toggle-button-active' 
                        : 'toggle-button-inactive'
                      : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemClick(subItem);
                  }}
                >
                  <div className="menu-button-icon">
                    {subItem.icon}
                  </div>
                  <div className="menu-button-hover">
                    <div className="menu-button-background" />
                  </div>
                </button>
                {subItem.isColorPicker && isColorPickerActive && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <ColorSwatches 
                      swatches={subItem.swatches!} 
                      onSelect={handleColorSelect}
                      isDualColor={subItem.isDualColor}
                      onClose={() => setActiveColorPicker(null)}
                      colorType={subItem.label}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function MenuItemComponent({ item, isOpen, toggleOpen }: { 
  item: MenuItem; 
  isOpen?: boolean;
  toggleOpen?: () => void;
}) {
  const [activeColorPicker, setActiveColorPicker] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const starPowerButton = useVariant((state) => state.starPowerButton);
  const isRotationEnabled = useVariant((state) => state.isRotationEnabled);
  const isDynamicViewEnabled = useVariant((state) => state.isDynamicViewEnabled);
  const isPostEffectsEnabled = useVariant((state) => state.isPostEffectsEnabled);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        if (isOpen) {
          toggleOpen?.();
        }
        setActiveColorPicker(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleOpen]);

  const handleColorSelect = (colorType: string, color: string) => {
    if (item.onColorSelect) {
      item.onColorSelect(color);
    }
    setActiveColorPicker(null);
  };

  const handleItemClick = (subItem: MenuItem) => {
    if (subItem.isColorPicker) {
      const colorPickerId = `${item.label}-${subItem.label}`;
      setActiveColorPicker(activeColorPicker === colorPickerId ? null : colorPickerId);
    } else if (subItem.isToggle) {
      switch (subItem.id) {
        case 'starPowerButton':
          useVariant.setState({ starPowerButton: !starPowerButton });
          useVariant.setState({ targetType: 'body' });
          break;
        case 'rotation':
          useVariant.setState({ isRotationEnabled: !isRotationEnabled });
          break;
        case 'dynamicView':
          useVariant.setState({ isDynamicViewEnabled: !isDynamicViewEnabled });
          break;
        case 'postEffects':
          useVariant.setState({ isPostEffectsEnabled: !isPostEffectsEnabled });
          break;
      }
    } else if (subItem.onClick) {
      subItem.onClick();
    }
  };

  const buttonClassName = `menu-button ${item.onClick ? 'cart-button' : ''}`;
  const shouldUseGrid = item.items && item.items.length > 4;

  const getToggleState = (subItem: MenuItem) => {
    if (!subItem.isToggle || !subItem.id) return false;
    switch (subItem.id) {
      case 'starPowerButton': return starPowerButton;
      case 'rotation': return isRotationEnabled;
      case 'dynamicView': return isDynamicViewEnabled;
      case 'postEffects': return isPostEffectsEnabled;
      default: return subItem.active || false;
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={item.onClick || toggleOpen}
        className={buttonClassName}
        data-active={isOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="menu-button-icon">
          {item.onClick ? (
            isHovered ? <PackagePlus size={56} /> : <ShoppingCart size={56} />
          ) : (
            item.icon
          )}
        </div>
        {!item.onClick && (
          <div className="menu-button-hover">
            <div className="menu-button-background" />
            <span className="menu-button-label">
              {item.label}
            </span>
          </div>
        )}
      </button>
      
      {item.items && isOpen && (
        <div className={`submenu-container ${shouldUseGrid ? "grid-layout" : "flex gap-1.35 md:gap-1.8 2xl:gap-2.7 4xl:gap-8.1"}`}>
          {item.items.map((subItem, index) => {
            const colorPickerId = `${item.label}-${subItem.label}`;
            const isColorPickerActive = activeColorPicker === colorPickerId;
            const shouldFadeOut = activeColorPicker !== null && !isColorPickerActive;

            return (
              <div 
                key={index} 
                className={`submenu-item ${shouldFadeOut ? 'fade-out' : ''}`}
              >
                <div className={subItem.labelClassName || "submenu-label"}>
                  {subItem.label}
                </div>
                <button
                  className={`${subItem.className || "submenu-button"} ${
                    subItem.isToggle 
                      ? getToggleState(subItem)
                        ? 'toggle-button-active' 
                        : 'toggle-button-inactive'
                      : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemClick(subItem);
                  }}
                >
                  <div className="menu-button-icon">
                    {subItem.icon}
                  </div>
                  <div className="menu-button-hover">
                    <div className="menu-button-background" />
                  </div>
                </button>
                {subItem.isColorPicker && isColorPickerActive && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <ColorSwatches 
                      swatches={subItem.swatches!} 
                      onSelect={handleColorSelect}
                      isDualColor={subItem.isDualColor}
                      onClose={() => setActiveColorPicker(null)}
                      colorType={subItem.label}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      
      {item.subItems && isOpen && (
        <div className="custom-submenu">
          {item.subItems.map((subItem, index) => (
            <SubMenuItem key={index} item={subItem} parentOpen={isOpen} />
          ))}
        </div>
      )}
    </div>
  );
}

function Ui() {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const headstock = useVariant((state) => state.headstock);

  const handleAddToCart = () => {
    console.log("Adding to Cart");

    const productDetails = {
      id: "product-id-123",
      name: "Sample Product",
      headstock: headstock,
    };
    window.parent.postMessage(
      productDetails,
      "https://hing62.wixsite.com/hello-guitars"
    );

    console.log(productDetails);
  };

  const handleResetView = () => {
    useVariant.setState({ targetType: 'default' });
  };

  const menuItems: MenuItem[] = [
    {
      icon: <Hammer size={56} />,
      label: "Customise",
      subItems: customiseMenuItems,
    },
    {
      icon: <Settings size={56} />,
      label: "Settings",
      items: [
        { 
          icon: <Rotate3d size={24} />, 
          label: "Auto Rotate", 
          isToggle: true,
          id: "rotation"
        },
        { 
          icon: <SwitchCamera size={24} />, 
          label: "Dynamic View",
          isToggle: true,
          id: "dynamicView"
        },
        { 
          icon: <Sparkles size={24} />, 
          label: "Post Effects",
          isToggle: true,
          id: "postEffects"
        },
        {
          icon: <Home size={24} />,
          label: "Reset View",
          onClick: handleResetView
        }
      ],
    },
    {
      icon: <ShoppingCart size={56} />,
      label: "Add to Cart",
      onClick: handleAddToCart,
    },
  ];

  return (
    <div className="menu-container">
      <div className="menu-items-container">
        {menuItems.map((item, index) => (
          <MenuItemComponent
            key={index}
            item={item}
            isOpen={openMenuIndex === index}
            toggleOpen={() => {
              if (!item.onClick) {
                setOpenMenuIndex(openMenuIndex === index ? null : index);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Ui;