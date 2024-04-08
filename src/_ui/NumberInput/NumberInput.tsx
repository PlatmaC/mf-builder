import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import cn from 'classnames';
import {
  InputHTMLAttributes,
  KeyboardEvent,
  ChangeEvent,
  FocusEvent,
  ReactNode,
  useEffect,
  useState,
  useMemo,
  useRef,
  memo,
} from 'react';

import '@/_styles/ui-elements/number-input.scss';

type NumberInputPropsType = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange' | 'value' | 'min' | 'max' | 'step'
> & {
  onChange?: (newValue: number) => void;
  label?: ReactNode;
  toFixed?: number;
  value?: number;
  min?: number;
  max?: number;
};

export const NumberInput = memo(
  ({
    min,
    max,
    label,
    className,
    toFixed = 0,
    value: outsideValue,
    onChange: outsideOnChange,
    ...restProps
  }: NumberInputPropsType) => {
    const [innerValue, setInnerValue] = useState<string | number>(outsideValue ?? '');
    const clickTimer = useRef<NodeJS.Timeout | null>(null);
    const inputNode = useRef<HTMLInputElement>(null);

    const step = useMemo(() => {
      if (toFixed) return Number(`0.${Array(Math.ceil(toFixed)).join('0')}1`);
      else return 1;
    }, [toFixed]);

    const prettifyValue = (value: string | number) => {
      let notEmptyValue = value;
      if (value === '' && outsideValue !== undefined) notEmptyValue = outsideValue;
      else if (value === '' && outsideValue === undefined) return setInnerValue(value);
      let hasDot = false;
      const isNegative = notEmptyValue.toString()[0].includes('-');
      const newNumber = Number(
        notEmptyValue
          .toString()
          .replace(/[^0-9.]/g, '')
          .replace(/\./g, (match) => {
            if (hasDot) return '';
            else {
              hasDot = true;
              return match;
            }
          })
      );
      const roundedNumber = Number((isNaN(newNumber) ? 0 : newNumber).toFixed(toFixed));
      let overriddenNumber = roundedNumber * (isNegative ? -1 : 1);
      if (min !== undefined) overriddenNumber = overriddenNumber < min ? min : overriddenNumber;
      if (max !== undefined) overriddenNumber = overriddenNumber > max ? max : overriddenNumber;
      outsideOnChange?.(overriddenNumber);
      setInnerValue(overriddenNumber);
    };

    const increase = () => {
      inputNode.current?.focus();
      if (typeof innerValue === 'number') {
        let newValue = Number((innerValue + step).toFixed(toFixed));
        prettifyValue(newValue);
        clickTimer.current = setInterval(() => {
          newValue = Number((newValue + step).toFixed(toFixed));
          if (max && newValue > max) clearTimer();
          else prettifyValue(newValue);
        }, 100);
      } else prettifyValue(step);
    };

    const decrease = () => {
      inputNode.current?.focus();
      if (typeof innerValue === 'number') {
        let newValue = Number((innerValue - step).toFixed(toFixed));
        prettifyValue(newValue);
        clickTimer.current = setInterval(() => {
          newValue = Number((newValue - step).toFixed(toFixed));
          if (min !== undefined && newValue < min) clearTimer();
          else prettifyValue(newValue);
        }, 100);
      } else prettifyValue(step);
    };

    const clearTimer = () => clickTimer.current && clearInterval(clickTimer.current);

    const handleOnBlur = (_e: FocusEvent<HTMLInputElement>) => prettifyValue(innerValue);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => setInnerValue(e.target.value);

    const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        inputNode.current?.blur();
        prettifyValue(innerValue);
      } else if (e.key === 'Escape') {
        prettifyValue(outsideValue ?? innerValue);
        inputNode.current?.blur();
      }
    };

    useEffect(() => {
      if (outsideValue !== undefined) innerValue !== outsideValue && setInnerValue(outsideValue);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [outsideValue]);

    return (
      <div className={cn('number-input__wrapper', className)}>
        {label && <label className="number-input__label">{label}</label>}
        <div className="number-input__receptacle">
          <input
            className="number-input__input"
            onKeyDown={handleOnKeyDown}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            value={innerValue}
            ref={inputNode}
            tabIndex={1}
            {...restProps}
          />
          <div className="number-input__container">
            <IconChevronUp
              className="number-input__icon"
              onMouseLeave={clearTimer}
              onMouseDown={increase}
              onMouseUp={clearTimer}
              size={12}
            />
            <IconChevronDown
              className="number-input__icon"
              onMouseLeave={clearTimer}
              onMouseUp={clearTimer}
              onMouseDown={decrease}
              size={12}
            />
          </div>
        </div>
      </div>
    );
  }
);
