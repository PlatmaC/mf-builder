import { IconInfoCircleFilled } from '@tabler/icons-react';
import { useCallback, useMemo, useState } from 'react';
import upperFirst from 'lodash/upperFirst';
import cn from 'classnames';

import { canvasColumnAmount, canvasRowHeightInPixels, onePercentOfCanvasColumnAmount } from '@/_helpers/constants';
import { SizeUnitMeasurementEnum } from '@/types/EditorTypes/InspectorElementTypes';
import { NumberInput } from '@/_ui/NumberInput/NumberInput';
import { ToolTip } from '@/_components/ToolTip';

import '@/_styles/widgets/layout-changer.scss';

export type OnPropertyChangeType = (newValue: number) => void;

type SizeManipulatorUIPropsType = {
  onHeightChange: OnPropertyChangeType;
  onWidthChange: OnPropertyChangeType;
  canvasHeight: string;
  height?: number;
  width?: number;
};

export const SizeManipulator = ({
  onHeightChange,
  onWidthChange,
  canvasHeight,
  height,
  width,
}: SizeManipulatorUIPropsType) => {
  const [widthUnitMeasurement, setWidthUnitMeasurement] = useState<
    SizeUnitMeasurementEnum.column | SizeUnitMeasurementEnum.percent
  >(SizeUnitMeasurementEnum.column);
  const [heightUnitMeasurement, setHeightUnitMeasurement] = useState<
    SizeUnitMeasurementEnum.row | SizeUnitMeasurementEnum.pixel
  >(SizeUnitMeasurementEnum.row);

  const { widthUnit, canvasMinWidth, canvasMaxWidth } = useMemo(() => {
    if (widthUnitMeasurement === SizeUnitMeasurementEnum.percent) {
      return {
        widthUnit: width !== undefined ? Number((width / onePercentOfCanvasColumnAmount).toFixed(2)) : width,
        canvasMinWidth: 0.01,
        canvasMaxWidth: 100,
      };
    } else
      return {
        widthUnit: width !== undefined ? Number(width.toFixed(2)) : width,
        canvasMaxWidth: canvasColumnAmount,
        canvasMinWidth: 1,
      };
  }, [width, widthUnitMeasurement]);

  const { heightUnit, canvasMaxHeight } = useMemo(() => {
    if (heightUnitMeasurement === SizeUnitMeasurementEnum.pixel)
      return { heightUnit: height, canvasMaxHeight: Number(canvasHeight) };
    else
      return {
        heightUnit: height !== undefined ? height / canvasRowHeightInPixels : height,
        canvasMaxHeight: Math.floor(Number(canvasHeight) / canvasRowHeightInPixels),
      };
  }, [canvasHeight, height, heightUnitMeasurement]);

  const changeWidthUnitMeasurement =
    (newUnitMeasurement: SizeUnitMeasurementEnum.column | SizeUnitMeasurementEnum.percent) => () =>
      setWidthUnitMeasurement(newUnitMeasurement);

  const changeHeigthUnitMeasurement =
    (newUnitMeasurement: SizeUnitMeasurementEnum.row | SizeUnitMeasurementEnum.pixel) => () =>
      setHeightUnitMeasurement(newUnitMeasurement);

  const extendedOnWidthChange = useCallback(
    (newValue: number) => {
      onWidthChange(
        widthUnitMeasurement === SizeUnitMeasurementEnum.percent
          ? Number(newValue / (canvasMaxWidth / canvasColumnAmount))
          : newValue
      );
    },
    [canvasMaxWidth, onWidthChange, widthUnitMeasurement]
  );

  const extendedOnHeightChange = useCallback(
    (newValue: number) => {
      onHeightChange(
        heightUnitMeasurement === SizeUnitMeasurementEnum.pixel ? newValue : newValue * canvasRowHeightInPixels
      );
    },
    [heightUnitMeasurement, onHeightChange]
  );

  return (
    <section className="layout-changer__wrapper">
      <div className="layout-changer__container">
        <NumberInput
          toFixed={widthUnitMeasurement === SizeUnitMeasurementEnum.column ? 0 : 2}
          className="layout-changer__input"
          onChange={extendedOnWidthChange}
          min={canvasMinWidth}
          max={canvasMaxWidth}
          value={widthUnit}
          label={'Width:'}
        />
        <label className="layout-changer__label">By:</label>
        <button
          className={cn('layout-changer__button', {
            ['layout-changer__button--selected']: widthUnitMeasurement === SizeUnitMeasurementEnum.column,
          })}
          onClick={changeWidthUnitMeasurement(SizeUnitMeasurementEnum.column)}
        >
          {upperFirst(SizeUnitMeasurementEnum.column)}
        </button>
        <button
          className={cn('layout-changer__button', {
            ['layout-changer__button--selected']: widthUnitMeasurement === SizeUnitMeasurementEnum.percent,
          })}
          onClick={changeWidthUnitMeasurement(SizeUnitMeasurementEnum.percent)}
        >
          {upperFirst(SizeUnitMeasurementEnum.percent)}
        </button>
        <ToolTip
          message={`The width is set relative to the ${
            widthUnitMeasurement === SizeUnitMeasurementEnum.percent ? 'canvas' : 'grid'
          }. The maximum is ${canvasMaxWidth} ${
            widthUnitMeasurement === SizeUnitMeasurementEnum.percent ? 'percent' : 'columns'
          }. The minimum is ${canvasMinWidth} ${
            widthUnitMeasurement === SizeUnitMeasurementEnum.percent ? 'percent' : 'columns'
          }.`}
          delay={{ show: 100, hide: 100 }}
        >
          <IconInfoCircleFilled className="layout-changer__icon" size={16} />
        </ToolTip>
      </div>

      <div className="layout-changer__container">
        <NumberInput
          className="layout-changer__input"
          onChange={extendedOnHeightChange}
          max={canvasMaxHeight}
          value={heightUnit}
          label={'Height:'}
          min={1}
        />
        <label className="layout-changer__label">By:</label>
        <button
          className={cn('layout-changer__button', {
            ['layout-changer__button--selected']: heightUnitMeasurement === SizeUnitMeasurementEnum.row,
          })}
          onClick={changeHeigthUnitMeasurement(SizeUnitMeasurementEnum.row)}
        >
          {upperFirst(SizeUnitMeasurementEnum.row)}
        </button>
        <button
          className={cn('layout-changer__button', {
            ['layout-changer__button--selected']: heightUnitMeasurement === SizeUnitMeasurementEnum.pixel,
          })}
          onClick={changeHeigthUnitMeasurement(SizeUnitMeasurementEnum.pixel)}
        >
          {upperFirst(SizeUnitMeasurementEnum.pixel)}
        </button>
        <ToolTip
          message={`The height is set relative to the ${
            heightUnitMeasurement === SizeUnitMeasurementEnum.pixel ? 'canvas' : 'grid'
          }. The maximum is ${canvasMaxHeight} ${
            heightUnitMeasurement === SizeUnitMeasurementEnum.pixel ? 'px' : 'rows'
          }. The minimum is 1 ${heightUnitMeasurement === SizeUnitMeasurementEnum.pixel ? 'px' : 'rows'}.`}
          delay={{ show: 100, hide: 100 }}
        >
          <IconInfoCircleFilled className="layout-changer__icon" size={16} />
        </ToolTip>
      </div>
    </section>
  );
};
