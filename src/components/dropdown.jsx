import React from 'react';
import PropTypes from 'prop-types';
import '../Buttons.css';
import useVariant from '../stores/useVariant.jsx'

const Dropdown = ({ isVisible, items, toggleSetting }) => {
  if (!isVisible) return null;

  const changeVariant = (item) => {
    if (item.type == 'base') {
      useVariant.setState({base: item.name})
    } else if (item.type == 'baseColor') {
      useVariant.setState({baseColor: item.color})
    } else if (item.type == 'headstock') {
      useVariant.setState({headstock: item.name})
    } else if (item.type == 'neckColor') {
      useVariant.setState({neckColor: item.color})
    } else if (item.type == 'fretbBoardColor') {  
      useVariant.setState({fretBoardColor: item.color})
    } else if (item.type == 'fretbBoardBindingColor') {
      useVariant.setState({fretBoardBindingColor: item.color})
    } else if (item.type == 'pickGuardColor') {
      useVariant.setState({pickGuardColor: item.color})
    } else if (item.type == 'hardwareColor') {
      useVariant.setState({hardwareColor: item.color})
    }
};


  return (
    <ul className="dropdown-menu">
      {items.map((item, index) => (
        <li key={index} className="dropdown-item" onClick={() => changeVariant(item)}>
        <div className="dropdown-item-content">
            <div className="dropdown-item-icon">
              {item.icon}
            </div>
            <div className="dropdown-item-text">
              {item.text}
            </div>
            {toggleSetting && item.hasOwnProperty('toggled') && (
              <label className="switch">
                <input
                  type="checkbox"
                  checked={item.toggled}
                  onChange={() => toggleSetting(index)}
                />
                <span className="slider"></span>
              </label>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

Dropdown.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    icon: PropTypes.node,
    toggled: PropTypes.bool
  })).isRequired,
  toggleSetting: PropTypes.func,
};

export default Dropdown;
