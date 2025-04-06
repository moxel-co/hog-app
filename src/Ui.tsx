import React, { useState, useRef, useEffect } from 'react';
import { Settings, Rotate3d, Hammer, Home, Palette, ShoppingCart, PackagePlus, Sparkles, SwitchCamera } from 'lucide-react';
import { customiseMenuItems } from './data/menuItems';
import { MenuItem } from './types';
import { ColorSwatches } from './components/ColorSwatches';
import useVariant from './stores/useVariant';
import AddToCartButton from './components/AddToCart.tsx';

function SubMenuItem({ item, parentOpen, onSubMenuOpen, activeSubMenuId, setActiveSubMenuId }: { 
  item: MenuItem;
  parentOpen: boolean;
  onSubMenuOpen: (isOpen: boolean) => void;
  activeSubMenuId: string | null;
  setActiveSubMenuId: (id: string | null) => void;
}) {
  const [activeColorPicker, setActiveColorPicker] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const starPowerButton = useVariant((state) => state.starPowerButton);
  const isRotationEnabled = useVariant((state) => state.isRotationEnabled);
  const isDynamicViewEnabled = useVariant((state) => state.isDynamicViewEnabled);
  const isPostEffectsEnabled = useVariant((state) => state.isPostEffectsEnabled);

  const isOpen = activeSubMenuId === item.label;

  useEffect(() => {
    if (!parentOpen) {
      setActiveColorPicker(null);
      setActiveSubMenuId(null);
    }
  }, [parentOpen, setActiveSubMenuId]);

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

  const handleToggleOpen = () => {
    const newIsOpen = !isOpen;
    if (newIsOpen) {
      setActiveSubMenuId(item.label);
    } else {
      setActiveSubMenuId(null);
    }
    onSubMenuOpen(newIsOpen);
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
        onClick={handleToggleOpen}
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

function MenuItemComponent({ item, isOpen, toggleOpen, onSubMenuOpen, activeSubMenuId, setActiveSubMenuId }: { 
  item: MenuItem; 
  isOpen?: boolean;
  toggleOpen?: () => void;
  onSubMenuOpen: (isOpen: boolean) => void;
  activeSubMenuId: string | null;
  setActiveSubMenuId: (id: string | null) => void;
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
            <SubMenuItem 
              key={index} 
              item={subItem} 
              parentOpen={isOpen} 
              onSubMenuOpen={onSubMenuOpen}
              activeSubMenuId={activeSubMenuId}
              setActiveSubMenuId={setActiveSubMenuId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Ui() {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [activeSubMenuId, setActiveSubMenuId] = useState<string | null>(null);
  const [anySubMenuOpen, setAnySubMenuOpen] = useState(false);

  const handleResetView = () => {
    useVariant.setState({ targetType: Math.random() });
  };

  const handleSubMenuOpen = (isOpen: boolean) => {
    setAnySubMenuOpen(isOpen);
  };

  const handleMenuToggle = (index: number) => {
    if (openMenuIndex === index && !anySubMenuOpen) {
      setOpenMenuIndex(null);
    } else {
      setOpenMenuIndex(index);
      setActiveSubMenuId(null);
    }
    setAnySubMenuOpen(false);
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
                handleMenuToggle(index);
              }
            }}
            onSubMenuOpen={handleSubMenuOpen}
            activeSubMenuId={activeSubMenuId}
            setActiveSubMenuId={setActiveSubMenuId}
          />
        ))}
        {/* Add the AddToCartButton as a standalone component */}
        <AddToCartButton />
      </div>
    </div>
  );
}

export default Ui;