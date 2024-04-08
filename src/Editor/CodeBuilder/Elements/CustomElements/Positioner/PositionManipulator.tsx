import { IconInfoCircleFilled } from '@tabler/icons-react';
import upperFirst from 'lodash/upperFirst';
import { useCallback, useMemo, useState } from 'react';
import cn from 'classnames';

import { canvasColumnAmount, canvasRowHeightInPixels, onePercentOfCanvasColumnAmount } from '@/_helpers/constants';
import { SizeUnitMeasurementEnum } from '@/types/EditorTypes/InspectorElementTypes';
import { NumberInput } from '@/_ui/NumberInput/NumberInput';
import { ToolTip } from '@/_components/ToolTip';

import { OnPropertyChangeType } from '../Resizer/SizeManipulator';

export type PositionManipulatorUIPropsType = {
  onLeftChange: OnPropertyChangeType;
  onTopChange: OnPropertyChangeType;
  canvasHeight: string;
  left?: number;
  top?: number;
};

export const PositionManipulator = ({
  onLeftChange,
  canvasHeight,
  onTopChange,
  left,
  top,
}: PositionManipulatorUIPropsType) => {
  const [leftUnitMeasurement, setLeftUnitMeasurement] = useState<
    SizeUnitMeasurementEnum.column | SizeUnitMeasurementEnum.percent
  >(SizeUnitMeasurementEnum.column);
  const [topUnitMeasurement, setTopUnitMeasurement] = useState<
    SizeUnitMeasurementEnum.row | SizeUnitMeasurementEnum.pixel
  >(SizeUnitMeasurementEnum.row);

  const { leftUnit, canvasMinWidth, canvasMaxWidth } = useMemo(() => {
    if (leftUnitMeasurement === SizeUnitMeasurementEnum.column) {
      return {
        leftUnit: left !== undefined ? Number((left * onePercentOfCanvasColumnAmount).toFixed(2)) : left,
        canvasMaxWidth: canvasColumnAmount,
        canvasMinWidth: 0,
      };
    } else
      return {
        leftUnit: left !== undefined ? Number(left.toFixed(2)) : left,
        canvasMaxWidth: 100,
        canvasMinWidth: 0,
      };
  }, [left, leftUnitMeasurement]);

  const { topUnit, canvasMaxHeight } = useMemo(() => {
    if (topUnitMeasurement === SizeUnitMeasurementEnum.pixel) {
      return { topUnit: top, canvasMaxHeight: Number(canvasHeight) };
    } else
      return {
        topUnit: top !== undefined ? top / canvasRowHeightInPixels : top,
        canvasMaxHeight: Math.floor(Number(canvasHeight) / canvasRowHeightInPixels),
      };
  }, [canvasHeight, top, topUnitMeasurement]);

  const extendedOnLeftChange = useCallback(
    (newValue: number) => {
      onLeftChange(
        leftUnitMeasurement === SizeUnitMeasurementEnum.column
          ? Number((newValue / onePercentOfCanvasColumnAmount).toFixed(2))
          : newValue
      );
    },
    [leftUnitMeasurement, onLeftChange]
  );

  const extendedOnTopChange = useCallback(
    (newValue: number) => {
      onTopChange(topUnitMeasurement === SizeUnitMeasurementEnum.pixel ? newValue : newValue * canvasRowHeightInPixels);
    },
    [onTopChange, topUnitMeasurement]
  );

  const changeLeftUnitMeasurement =
    (newUnitMeasurement: SizeUnitMeasurementEnum.column | SizeUnitMeasurementEnum.percent) => () =>
      setLeftUnitMeasurement(newUnitMeasurement);

  const changeTopUnitMeasurement =
    (newUnitMeasurement: SizeUnitMeasurementEnum.row | SizeUnitMeasurementEnum.pixel) => () =>
      setTopUnitMeasurement(newUnitMeasurement);

  return (
    <section className="layout-changer__wrapper">
      <div className="layout-changer__container">
        <NumberInput
          toFixed={leftUnitMeasurement === SizeUnitMeasurementEnum.column ? 0 : 2}
          className="layout-changer__input"
          onChange={extendedOnLeftChange}
          min={canvasMinWidth}
          max={canvasMaxWidth}
          value={leftUnit}
          label={'Left:'}
        />
        <label className="layout-changer__label">By:</label>
        <button
          className={cn('layout-changer__button', {
            ['layout-changer__button--selected']: leftUnitMeasurement === SizeUnitMeasurementEnum.column,
          })}
          onClick={changeLeftUnitMeasurement(SizeUnitMeasurementEnum.column)}
        >
          {upperFirst(SizeUnitMeasurementEnum.column)}
        </button>
        <button
          className={cn('layout-changer__button', {
            ['layout-changer__button--selected']: leftUnitMeasurement === SizeUnitMeasurementEnum.percent,
          })}
          onClick={changeLeftUnitMeasurement(SizeUnitMeasurementEnum.percent)}
        >
          {upperFirst(SizeUnitMeasurementEnum.percent)}
        </button>
        <ToolTip
          message={`The left coordinate is set relative to the ${
            leftUnitMeasurement === SizeUnitMeasurementEnum.percent ? 'canvas' : 'grid'
          }. The maximum is ${canvasMaxWidth} ${
            leftUnitMeasurement === SizeUnitMeasurementEnum.percent ? 'percent' : 'column'
          }. The minimum is ${canvasMinWidth} ${
            leftUnitMeasurement === SizeUnitMeasurementEnum.percent ? 'percent' : 'column'
          }.`}
          delay={{ show: 100, hide: 100 }}
        >
          <IconInfoCircleFilled className="layout-changer__icon" size={16} />
        </ToolTip>
      </div>

      <div className="layout-changer__container">
        <NumberInput
          className="layout-changer__input"
          onChange={extendedOnTopChange}
          max={canvasMaxHeight}
          value={topUnit}
          label={'Top:'}
          min={0}
        />
        <label className="layout-changer__label">By:</label>
        <button
          className={cn('layout-changer__button', {
            ['layout-changer__button--selected']: topUnitMeasurement === SizeUnitMeasurementEnum.row,
          })}
          onClick={changeTopUnitMeasurement(SizeUnitMeasurementEnum.row)}
        >
          {upperFirst(SizeUnitMeasurementEnum.row)}
        </button>
        <button
          className={cn('layout-changer__button', {
            ['layout-changer__button--selected']: topUnitMeasurement === SizeUnitMeasurementEnum.pixel,
          })}
          onClick={changeTopUnitMeasurement(SizeUnitMeasurementEnum.pixel)}
        >
          {upperFirst(SizeUnitMeasurementEnum.pixel)}
        </button>
        <ToolTip
          message={`The top coordinate is set relative to the ${
            topUnitMeasurement === SizeUnitMeasurementEnum.pixel ? 'canvas' : 'grid'
          }. The maximum is ${canvasMaxHeight} ${
            topUnitMeasurement === SizeUnitMeasurementEnum.pixel ? 'px' : 'row'
          }. The minimum is 0 ${topUnitMeasurement === SizeUnitMeasurementEnum.pixel ? 'px' : 'row'}.`}
          delay={{ show: 100, hide: 100 }}
        >
          <IconInfoCircleFilled className="layout-changer__icon" size={16} />
        </ToolTip>
      </div>
    </section>
  );
};
