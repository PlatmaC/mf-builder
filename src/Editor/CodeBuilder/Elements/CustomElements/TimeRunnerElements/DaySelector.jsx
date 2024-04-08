import { CheckboxGroup } from '../../../../../_ui/CheckBox/CheckBox';

export const DaySelector = ({ value, onChange }) => {
  const handleOnChange = (selectedDays) => {
    const filledArray = selectedDays.reduce((daysArray, dayNumber, index) => {
      daysArray[index] = dayNumber;
      return daysArray;
    }, Array(7).fill(null));
    onChange(filledArray);
  };

  return (
    <CheckboxGroup
      values={value.filter((dayNumber) => dayNumber !== null)}
      options={[
        { value: 0, label: 'Sunday' },
        { value: 1, label: 'Monday' },
        { value: 2, label: 'Tuesday' },
        { value: 3, label: 'Wednesday' },
        { value: 4, label: 'Thursday' },
        { value: 5, label: 'Friday' },
        { value: 6, label: 'Saturday' },
      ]}
      onChange={handleOnChange}
      className="flex-wrap"
    />
  );
};
