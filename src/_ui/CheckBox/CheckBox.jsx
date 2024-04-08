import React from 'react';
import cn from 'classnames';

export const Checkbox = ({ label, isChecked, onChange, value }) => {
  const handleOnchange = (event) => {
    onChange(event, value);
  };

  return (
    <div className="form-check mx-1">
      <input
        style={{
          backgroundColor: '#D7DBDF',
        }}
        className="form-check-input"
        type="checkbox"
        onChange={handleOnchange}
        checked={isChecked}
      />
      <label className="form-check-label">{label}</label>
    </div>
  );
};

export const CheckboxGroup = ({ label, options = [], values, onChange, className }) => {
  const [checkedItems, setCheckedItems] = React.useState(values);

  React.useEffect(() => {
    onChange(checkedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedItems]);

  const handleCheckboxChange = (event, value) => {
    const checked = event.target.checked;

    if (checked) {
      setCheckedItems([...checkedItems, value]);
    } else {
      setCheckedItems(checkedItems.filter((item) => item !== value));
    }
  };

  return (
    <div className={cn('form-group d-flex', className)}>
      <label>{label}</label>
      {options.map((option, index) => {
        const isChecked = checkedItems.includes(option.value);
        return (
          <Checkbox
            key={index}
            label={option.label}
            value={option.value}
            isChecked={isChecked}
            onChange={handleCheckboxChange}
          />
        );
      })}
    </div>
  );
};
