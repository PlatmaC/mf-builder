import React, { useRef } from 'react';
import cx from 'classnames';

export const Link = ({ height, properties, styles, fireEvent, registerAction, dataCy }) => {
  const { linkTarget, linkText, targetType } = properties;
  const { textColor, textSize, underline, visibility, boxShadow, textAlign } = styles;
  const clickRef = useRef();

  const computedStyles = {
    fontSize: textSize,
    height,
    boxShadow,
    textAlign,
  };

  registerAction(
    'click',
    async function () {
      clickRef.current.click();
    },
    []
  );
  return (
    <div
      className={cx('link-widget', { 'd-none': !visibility }, `${underline}`)}
      style={computedStyles}
      data-cy={dataCy}
    >
      <a
        {...(linkTarget != '' ? { href: linkTarget } : {})}
        target={targetType === 'new' && '_blank'}
        onClick={(event) => {
          event.stopPropagation();
          fireEvent('onClick');
        }}
        onMouseOver={() => {
          fireEvent('onHover');
        }}
        style={{ color: textColor, width: '100%' }}
        ref={clickRef}
      >
        {linkText}
      </a>
    </div>
  );
};
