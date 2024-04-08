import React, { useEffect } from 'react';
import moment from 'moment';

import { taskCheckDelay, timerFormat } from '../../_helpers/constants';
import { useAppGlobalStore } from '@/_stores/appGlobalStore';

import '@/_styles/widgets/time-runner.scss';

export const TimeRunner = ({ properties, styles: { boxShadow, visibility }, width, height, ...rest }) => {
  const isEditorMode = useAppGlobalStore((state) => state.isEditorMode);

  useEffect(() => {
    let betweenTimesExecutorTimer;
    let specificTimeExecutorTimer;
    let atSomeTimeExecutorTimer;
    let intervalExecutorTimer;
    let onceExecutorTimer;

    const executeEventsByInterval = () => {
      const intervalMilliseconds = moment
        .duration(moment(properties.interval, timerFormat).diff(moment('00:00:00:000', timerFormat)))
        .asMilliseconds();
      intervalExecutorTimer = setInterval(() => rest.fireEvent('onInject'), intervalMilliseconds);
    };

    const fireRepeat = () => {
      if (properties.repeat === 'interval') executeEventsByInterval();
      else if (properties.repeat === 'betweenTimes') {
        const startMoment = moment(properties.startTime, timerFormat);
        const endMoment = moment(properties.endTime, timerFormat);
        betweenTimesExecutorTimer = setInterval(() => {
          const currentTime = moment().format(timerFormat);
          const currentDay = moment().day();
          const isBetween = moment(currentTime, timerFormat).isBetween(startMoment, endMoment);
          // execute interval only if current time between 'start' and 'end' time
          // also if it on specific selected day and interval has not fired yet
          if (isBetween && properties.onDays.includes(currentDay) && !intervalExecutorTimer) executeEventsByInterval();
          // stop the interval if it has exceeded the start and end times
          // or the day has already ended and the interval was started earlier
          else if ((!isBetween || !properties.onDays.includes(currentDay)) && intervalExecutorTimer)
            intervalExecutorTimer && clearInterval(intervalExecutorTimer);
        }, taskCheckDelay);
      } else if (properties.repeat === 'specificTime') {
        const atMoment = moment(properties.atTime, timerFormat);
        const atMomentBefore = atMoment.clone().subtract(taskCheckDelay, 'millisecond');
        const atMomentAfter = atMoment.clone().add(taskCheckDelay, 'millisecond');
        const currentDay = moment().day();
        specificTimeExecutorTimer = setInterval(() => {
          const currentTime = moment().format(timerFormat);
          const isBetween = moment(currentTime, timerFormat).isBetween(atMomentBefore, atMomentAfter);
          // execute the event only once if the current time is about at specific selected time (+-taskCheckDelay)
          // also if it's on some selected day and it hasn't started yet
          if (isBetween && properties.onDays.includes(currentDay) && !atSomeTimeExecutorTimer)
            atSomeTimeExecutorTimer = setTimeout(() => rest.fireEvent('onInject'), taskCheckDelay);
        }, taskCheckDelay);
      }
    };

    if (!properties.isDisabled || !isEditorMode) {
      if (properties.isOnce) {
        const afterMilliseconds = moment
          .duration(moment(properties.after, timerFormat).diff(moment('00:00:00:000', timerFormat)))
          .asMilliseconds();

        onceExecutorTimer = setTimeout(() => {
          rest.fireEvent('onInject');
          fireRepeat();
        }, afterMilliseconds);
      } else fireRepeat();
    }

    return () => {
      betweenTimesExecutorTimer && clearInterval(betweenTimesExecutorTimer);
      specificTimeExecutorTimer && clearInterval(specificTimeExecutorTimer);
      atSomeTimeExecutorTimer && clearTimeout(atSomeTimeExecutorTimer);
      intervalExecutorTimer && clearInterval(intervalExecutorTimer);
      onceExecutorTimer && clearTimeout(onceExecutorTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties.reinject, properties.isDisabled]);

  return (
    <section style={{ width, height, boxShadow, display: visibility ? 'block' : 'none' }}>
      {isEditorMode && <p className="time-runner__inner-section">{properties.isDisabled ? 'Disabled' : 'Enabled'}</p>}
    </section>
  );
};
