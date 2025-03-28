import React, { useState, useRef, useEffect } from 'react';
import { Settings, RotateCcw, Eye, Move, Palette, ShoppingCart, PackagePlus } from 'lucide-react';
import { colorSwatches, presetColorSwatches } from './data/colors';
import { customiseMenuItems } from './data/menuItems';
import { MenuItem } from './types';
import { ColorSwatches } from './components/ColorSwatches';
import useVariant from './stores/useVariant';


function SubMenuItem({ item, parentOpen }: { 
  item: MenuItem;
  parentOpen: boolean;
}) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parentOpen) {
      setIsOpen(false);
      setShowColorPicker(false);
    }
  }, [parentOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowColorPicker(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setShowColorPicker(false);
  };

  const handleItemClick = (subItem: MenuItem) => {
    if (subItem.isColorPicker) {
      setShowColorPicker(!showColorPicker);
    } else if (subItem.onClick) {
      subItem.onClick();
    }
  };

  const shouldUseGrid = item.items && item.items.length > 4;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="menu-button"
        style={selectedColor ? { color: selectedColor } : undefined}
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
          {item.items.map((subItem, index) => (
            <div key={index} className="submenu-item">
              <div className={subItem.labelClassName || "submenu-label"}>
                {subItem.label}
              </div>
              <button
                className={subItem.className || "submenu-button"}
                style={subItem.isColorPicker && selectedColor ? { color: selectedColor } : undefined}
                onClick={() => handleItemClick(subItem)}
              >
                <div className="menu-button-icon">
                  {subItem.icon}
                </div>
                <div className="menu-button-hover">
                  <div className="menu-button-background" />
                </div>
              </button>
              {subItem.isColorPicker && showColorPicker && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <ColorSwatches 
                    swatches={subItem.swatches!} 
                    onSelect={handleColorSelect}
                    isDualColor={subItem.isDualColor}
                  />
                </div>
              )}
            </div>
          ))}
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
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        if (isOpen) {
          toggleOpen?.();
        }
        setShowColorPicker(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleOpen]);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setShowColorPicker(false);
  };

  const handleItemClick = (subItem: MenuItem) => {
    if (subItem.isColorPicker) {
      setShowColorPicker(!showColorPicker);
    } else if (subItem.isToggle && subItem.onToggle) {
      subItem.onToggle();
    } else if (subItem.onClick) {
      subItem.onClick();
    }
  };

  const buttonClassName = `menu-button ${item.onClick ? 'cart-button' : ''}`;
  const shouldUseGrid = item.items && item.items.length > 4;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={item.onClick || toggleOpen}
        className={buttonClassName}
        data-active={isOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={!item.onClick && selectedColor ? { color: selectedColor } : undefined}
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
          {item.items.map((subItem, index) => (
            <div key={index} className="submenu-item">
              <div className={subItem.labelClassName || "submenu-label"}>
                {subItem.label}
              </div>
              <button
                className={`${subItem.className || "submenu-button"} ${
                  subItem.isToggle 
                    ? subItem.active 
                      ? 'toggle-button-active' 
                      : 'toggle-button-inactive'
                    : ''
                }`}
                style={subItem.isColorPicker && selectedColor ? { color: selectedColor } : undefined}
                onClick={() => handleItemClick(subItem)}
              >
                <div className="menu-button-icon">
                  {subItem.icon}
                </div>
                <div className="menu-button-hover">
                  <div className="menu-button-background" />
                </div>
              </button>
              {subItem.isColorPicker && showColorPicker && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <ColorSwatches 
                    swatches={subItem.swatches!} 
                    onSelect={handleColorSelect}
                    isDualColor={subItem.isDualColor}
                  />
                </div>
              )}
            </div>
          ))}
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
  const isRotationEnabled = useVariant((state) => state.isRotationEnabled);
  const isDynamicViewEnabled = useVariant((state) => state.isDynamicViewEnabled);
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

  const menuItems: MenuItem[] = [
    {
      icon: <Palette size={56} />,
      label: "Customise",
      subItems: customiseMenuItems,
    },
    {
      icon: <Settings size={56} />,
      label: "Settings",
      items: [
        { 
          icon: <RotateCcw size={24} />, 
          label: "Rotation", 
          isToggle: true,
          active: isRotationEnabled,
          onToggle: () => useVariant.setState({isRotationEnabled: !isRotationEnabled})
        },
        { 
          icon: <Eye size={24} />, 
          label: "Dynamic View",
          isToggle: true,
          active: isDynamicViewEnabled,
          onToggle: () => useVariant.setState({isDynamicViewEnabled: !isDynamicViewEnabled})
        },
        { 
          icon: <Move size={24} />, 
          label: "Free View",
          onClick: () => console.log("Free View clicked")
        },
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