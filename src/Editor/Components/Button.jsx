import React, { useEffect, useMemo, useState } from 'react';
import cx from 'classnames';
import tinycolor from 'tinycolor2';

export const Button = function Button(props) {
  const { height, properties, styles, fireEvent, registerAction, id, dataCy, setExposedVariable } = props;
  const {
    backgroundColor,
    textColor,
    borderRadius,
    loaderColor,
    disabledState,
    borderColor,
    boxShadow,
    backgroundColorOnHover,
    backgroundColorOnClick,
  } = styles;

  const [label, setLabel] = useState(properties.text);
  const [disable, setDisable] = useState(disabledState);
  const [visibility, setVisibility] = useState(styles.visibility);
  const [loading, setLoading] = useState(properties.loadingState);

  useEffect(() => {
    setLabel(properties.text);
    setExposedVariable('buttonText', properties.text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties.text]);

  useEffect(() => {
    disable !== disabledState && setDisable(disabledState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabledState]);

  useEffect(() => {
    visibility !== styles.visibility && setVisibility(styles.visibility);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [styles.visibility]);

  useEffect(() => {
    loading !== properties.loadingState && setLoading(properties.loadingState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties.loadingState]);

  const { activeBtnColor, btnColorOnClick, btnColorOnHover } = useMemo(() => {
    const btnColorOnHover =
      backgroundColorOnHover ??
      (tinycolor(backgroundColor).isLight()
        ? tinycolor(backgroundColor).darken(10).toString()
        : tinycolor(backgroundColor).brighten(10).toString());

    const btnColorOnClick =
      backgroundColorOnClick ??
      (tinycolor(btnColorOnHover).isLight()
        ? tinycolor(btnColorOnHover).darken(15).toString()
        : tinycolor(btnColorOnHover).brighten(15).toString());

    const activeBtnColor = tinycolor(btnColorOnClick).isLight()
      ? tinycolor(btnColorOnClick).darken(20).setAlpha(0.2).toString()
      : tinycolor(btnColorOnClick).brighten(20).setAlpha(0.2).toString();

    return { btnColorOnHover, btnColorOnClick, activeBtnColor };
  }, [backgroundColor, backgroundColorOnClick, backgroundColorOnHover]);

  const computedStyles = {
    backgroundColor,
    color: textColor,
    width: '100%',
    borderRadius: `${borderRadius}px`,
    height,
    display: visibility ? '' : 'none',
    '--tblr-btn-color-darker': btnColorOnHover,
    '--loader-color': tinycolor(loaderColor ?? '#fff').toString(),
    '--tblr-btn-clicked-color': btnColorOnClick,
    '--tblr-btn-active-color': activeBtnColor,
    borderColor: borderColor,
    boxShadow: boxShadow,
  };

  registerAction(
    'click',
    async function () {
      if (!disable) {
        fireEvent('onClick');
      }
    },
    [disable]
  );

  registerAction(
    'setText',
    async function (text) {
      setLabel(text);
      setExposedVariable('buttonText', text);
    },
    [setLabel]
  );

  registerAction(
    'disable',
    async function (value) {
      setDisable(value);
    },
    [setDisable]
  );

  registerAction(
    'visibility',
    async function (value) {
      setVisibility(value);
    },
    [setVisibility]
  );

  registerAction(
    'loading',
    async function (value) {
      setLoading(value);
    },
    [setLoading]
  );

  const hasCustomBackground = backgroundColor?.charAt() === '#';
  if (hasCustomBackground) {
    computedStyles['--tblr-btn-color-darker'] =
      backgroundColorOnHover ??
      (tinycolor(backgroundColor).isLight()
        ? tinycolor(backgroundColor).darken(10).toString()
        : tinycolor(backgroundColor).brighten(10).toString());
  }

  const handleClick = () => {
    const event1 = new CustomEvent('submitForm', { detail: { buttonComponentId: id } });
    document.dispatchEvent(event1);
    fireEvent('onClick');
  };

  return (
    <div className="widget-button">
      <button
        disabled={disable}
        className={cx('jet-button btn btn-primary p-1 overflow-hidden', {
          'btn-loading': loading,
          'btn-custom': hasCustomBackground,
        })}
        style={computedStyles}
        onClick={handleClick}
        onMouseOver={() => {
          fireEvent('onHover');
        }}
        data-cy={dataCy}
        type="default"
      >
        {label}
      </button>
    </div>
  );
};
