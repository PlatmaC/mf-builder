import Select from 'react-select';
import cn from 'classnames';
import _ from 'lodash';

import defaultStyles from './styles';

export const SelectComponent = ({
  options = [],
  value,
  onChange,
  closeMenuOnSelect = null,
  className = '',
  customWrap, //used so that editor selects remains with old theme , remove when whole theme is same !
  ...restProps
}) => {
  const darkMode = localStorage.getItem('darkMode') === 'true';
  const {
    isMulti = false,
    styles = {},
    isLoading = false,
    hasSearch = true,
    height,
    width,
    placeholder = 'Select...',
    customOption = undefined,
    defaultValue = null,
    useMenuPortal = true, // todo: deprecate this prop, use menuPortalTarget instead
    maxMenuHeight = 250,
    menuPortalTarget = null,
    menuPlacement = 'auto',
    useCustomStyles = false,
    isDisabled = false,
  } = restProps;

  const customStyles = useCustomStyles ? styles : defaultStyles(darkMode, width, height, styles);
  const selectOptions =
    Array.isArray(options) && options.length === 0
      ? options
      : options.map((option) => {
          if (!option.hasOwnProperty('label')) {
            return _.mapKeys(option, (value, key) => (key === 'value' ? key : 'label'));
          }
          return option;
        });

  const currentValue = selectOptions.find((option) => option.value === value) || value;

  const handleOnChange = (data) => {
    if (isMulti) {
      onChange(data);
    } else {
      onChange(data.value);
    }
  };

  const renderCustomOption = (option) => {
    if (customOption) {
      return customOption(option);
    }

    return option.label;
  };

  return (
    <Select
      {...restProps}
      defaultValue={defaultValue}
      isDisabled={isDisabled || isLoading}
      options={selectOptions}
      value={currentValue}
      isSearchable={hasSearch}
      className={cn(className)}
      onChange={handleOnChange}
      placeholder={placeholder}
      styles={customStyles}
      formatOptionLabel={(option) => renderCustomOption(option)}
      menuPlacement={menuPlacement}
      maxMenuHeight={maxMenuHeight}
      menuPortalTarget={useMenuPortal ? document.body : menuPortalTarget}
      closeMenuOnSelect={closeMenuOnSelect ?? true}
      classNamePrefix={cn({ 'dark-theme': darkMode, 'react-select': customWrap })}
    />
  );
};
