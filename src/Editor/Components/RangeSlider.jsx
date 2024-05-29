import React, { useEffect, useMemo, useRef, useState } from 'react';
import throttle from 'lodash/throttle';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export const RangeSlider = function RangeSlider({ height, properties, styles, setExposedVariable, fireEvent, dataCy }) {
  const { value, min, max, enableTwoHandle } = properties;
  const { trackColor, handleColor, lineColor, visibility, boxShadow } = styles;
  const sliderRef = useRef(null);
  const [sliderValue, setSliderValue] = useState(0);
  const [rangeValue, setRangeValue] = useState([0, 100]);

  const toArray = (data) => (Array.isArray(data) ? data : [data, max]);
  const singleHandleValue = !enableTwoHandle ? (Array.isArray(value) ? value[0] : value) : 50;
  const twoHandlesArray = enableTwoHandle ? toArray(value) : [0, 100];

  const computedStyles = {
    height,
    display: visibility ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0px 2px',
    boxShadow,
  };

  useEffect(() => {
    setSliderValue(singleHandleValue);
    setExposedVariable('value', singleHandleValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleHandleValue]);

  useEffect(() => {
    setRangeValue(twoHandlesArray);
    setExposedVariable('value', twoHandlesArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...twoHandlesArray]);

  useEffect(() => {
    setExposedVariable('value', enableTwoHandle ? twoHandlesArray : singleHandleValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableTwoHandle]);

  const debouncedSliderChange = useMemo(
    () =>
      throttle((value) => {
        setExposedVariable('value', value);
        setSliderValue(value);
      }, 100),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const debouncedRangeChange = useMemo(
    () =>
      throttle((value) => {
        setExposedVariable('value', value);
        setRangeValue(value);
      }, 100),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const rangeStyles = {
    handleStyle: toArray(sliderValue).map(() => {
      return {
        backgroundColor: handleColor,
        borderColor: handleColor,
      };
    }),
    trackStyle: toArray(sliderValue).map(() => {
      return { backgroundColor: trackColor };
    }),
    railStyle: { backgroundColor: lineColor },
  };

  return (
    <div style={computedStyles} className="range-slider" data-cy={dataCy}>
      {enableTwoHandle ? (
        <Slider
          range
          min={min}
          max={max}
          defaultValue={toArray(rangeValue)}
          onChange={debouncedRangeChange}
          onAfterChange={() => fireEvent('onChange')}
          value={toArray(rangeValue)}
          ref={sliderRef}
          trackStyle={rangeStyles.trackStyle}
          railStyle={rangeStyles.railStyle}
          handleStyle={rangeStyles.handleStyle}
        />
      ) : (
        <Slider
          min={min}
          max={max}
          defaultValue={sliderValue}
          value={sliderValue}
          ref={sliderRef}
          onChange={debouncedSliderChange}
          onAfterChange={() => fireEvent('onChange')}
          trackStyle={{ backgroundColor: trackColor }}
          railStyle={{ backgroundColor: lineColor }}
          handleStyle={{
            backgroundColor: handleColor,
            borderColor: handleColor,
          }}
        />
      )}
    </div>
  );
};
