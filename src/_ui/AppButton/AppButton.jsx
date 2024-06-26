import { Spinner } from 'react-bootstrap';
import cn from 'classnames';

import SolidIcon from '../Icon/solidIcons/index';

import './AppButton.scss';

export const ButtonBase = function ButtonBase(props) {
  const mapBaseSize = {
    lg: 'tj-large-btn',
    md: 'tj-medium-btn',
    sm: 'tj-small-btn',
    xs: 'tj-extra-small-btn',
  };

  const {
    className,
    size = 'lg', // specify size otherwise large button dimesnions will be applied with min width
    as = 'button', // render it as a button or an anchor.
    children,
    disabled,
    leftIcon,
    rightIcon,
    backgroundColor,
    type,
    isLoading,
    loadingWithChildren,
    fill,
    iconCustomClass,
    iconWidth,
    ...restProps
  } = props;

  const isAnchor = (!!restProps.href || as === 'a') && !disabled;
  const Element = as ? as : isAnchor ? 'a' : 'button';

  return (
    <Element
      {...restProps}
      className={`tj-base-btn ${mapBaseSize[size]}  ${className}`}
      disabled={disabled}
      style={backgroundColor && { backgroundColor }}
      type={isAnchor ? undefined : type || 'button'}
    >
      {!isLoading && leftIcon && (
        <span className="tj-btn-left-icon">
          {<SolidIcon fill={fill} className={iconCustomClass} name={leftIcon} width={iconWidth} />}
        </span>
      )}
      {isLoading ? (
        <div className={cn('spinner', { ['d-flex gap-2']: loadingWithChildren })}>
          <Spinner />
          {loadingWithChildren && children}
        </div>
      ) : (
        children
      )}
      {!isLoading && rightIcon && (
        <span className="tj-btn-right-icon">
          {<SolidIcon className={iconCustomClass} fill={fill} name={rightIcon} />}
        </span>
      )}
    </Element>
  );
};

export const ButtonSolid = function ButtonSolid(props) {
  const mapVariant = {
    primary: 'tj-primary-btn',
    ghostBlue: 'tj-ghost-blue-btn',
    ghostBlack: 'tj-ghost-black-btn',
    secondary: 'tj-secondary-btn',
    tertiary: 'tj-tertiary-btn',
    dangerPrimary: 'tj-primary-danger-btn',
    dangerSecondary: 'tj-secondary-danger-btn',
    dangerTertiary: 'tj-tertiary-danger-btn',
    dangerGhost: 'tj-ghost-danger-btn',
  };

  const { variant = 'primary', className, ...restProps } = props;
  return <ButtonBase {...restProps} className={`${mapVariant[variant]} ${className && className}`} />;
};
