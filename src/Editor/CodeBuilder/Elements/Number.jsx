import { useEffect, useMemo, useState } from 'react';
import throttle from 'lodash/throttle';
import FxButton from './FxButton';

export const Number = ({ value, onChange, forceCodeBox, cyLabel, withFxButton = true }) => {
  const [number, setNumber] = useState(value ? value : 0);
  const darkMode = localStorage.getItem('darkMode') === 'true';

  useEffect(() => {
    if (value !== number) setNumber(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHandleChange = useMemo(() => throttle((value) => onChange(`{{${value}}}`), 100), []);

  const numberTheme = {
    backgroundColor: 'transparent',
    border: 'none',
    color: darkMode && '#fff',
    width: '100%',
  };
  return (
    <>
      <div className="row fx-container">
        <div className="col">
          <div className="field form-control" style={{ padding: '0.225rem 0.35rem' }}>
            <input
              style={numberTheme}
              type="number"
              onChange={(e) => {
                setNumber(e.target.value);
                debouncedHandleChange(e.target.value);
              }}
              value={number}
              data-cy={`${String(cyLabel)}-input-field`}
            />
          </div>
        </div>
        {withFxButton && (
          <div className="col-auto pt-0 style-fx fx-common">
            <FxButton active={false} onPress={forceCodeBox} dataCy={String(cyLabel)} />
          </div>
        )}
      </div>
    </>
  );
};
