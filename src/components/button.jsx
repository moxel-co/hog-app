import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from './dropdown';
import '../Buttons.css';

const Button = ({ type, onClick, children, className, disabled, style, items, isOpen, toggleDropdown, toggleSetting }) => {

  const handleButtonClick = () => {
    toggleDropdown();
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="button-with-dropdown">
      <button
        type={type}
        onClick={handleButtonClick}
        className={className}
        disabled={disabled}
        style={style}
      >
        {children}
      </button>
      <Dropdown 
        isVisible={isOpen} 
        items={items} 
        toggleSetting={toggleSetting} 
      />
    </div>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    icon: PropTypes.node,
    toggled: PropTypes.bool
  })),
  isOpen: PropTypes.bool.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  toggleSetting: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  onClick: () => {},
  className: '',
  disabled: false,
  style: {},
  items: [],
};

export default Button;