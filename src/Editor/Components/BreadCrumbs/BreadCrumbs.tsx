import { Breadcrumb } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import capitalize from 'lodash/capitalize';
import { Link } from 'react-router-dom';

import { useRouterPages } from '../Catalog/CatalogHelpers';
import { BreadCrumbsPropsType } from './BreadCrumbsTypes';

import '@/_styles/widgets/bread-crumbs.scss';

export const BreadCrumbs = ({ properties, currentState, mode, height, styles }: BreadCrumbsPropsType) => {
  const { subPage, innerPage, getRedirectPath } = useRouterPages({ mode, currentState });

  const computedStyles = {
    display: styles.visibility ? 'flex' : 'none',
    letterSpacing: `${styles.letterSpacing}px`,
    textIndent: `${styles.textIndent}px`,
    wordSpacing: `${styles.wordSpacing}px`,
    backgroundColor: styles.backgroundColor,
    textTransform: styles.transformation,
    textDecoration: styles.decoration,
    fontVariant: styles.fontVariant,
    textAlign: styles.textAlign,
    fontWeight: styles.fontWeight,
    lineHeight: styles.lineHeight,
    fontStyle: styles.fontStyle,
    boxShadow: styles.boxShadow,
    fontSize: styles.textSize,
    color: styles.textColor,
    height,
  };

  return (
    <section className="bread-crumbs__wrapper" style={computedStyles}>
      {properties.loadingState ? (
        <Skeleton
          count={innerPage ? 3 : subPage || properties.subPageComputedName ? 2 : 1}
          containerClassName="bread-crumbs__skeleton"
        />
      ) : (
        <Breadcrumb className="bread-crumbs__container">
          {properties.maxLength >= 1 && (
            <Breadcrumb.Item
              linkAs="span"
              active={!(innerPage || properties.innerPageComputedName) && !(subPage || properties.subPageComputedName)}
            >
              <Link style={{ color: styles.textColor }} to={getRedirectPath()}>
                {currentState.page.name}
              </Link>
            </Breadcrumb.Item>
          )}
          {(subPage || properties.subPageComputedName) && properties.maxLength >= 2 && (
            <Breadcrumb.Item linkAs="span" active={!innerPage}>
              <Link style={{ color: styles.textColor }} to={getRedirectPath(subPage)}>
                {properties.subPageComputedName ? String(properties.subPageComputedName) : capitalize(subPage)}
              </Link>
            </Breadcrumb.Item>
          )}
          {innerPage && properties.maxLength >= 3 && (
            <Breadcrumb.Item linkAs="span" active>
              <Link style={{ color: styles.textColor }} to={getRedirectPath(subPage, innerPage)}>
                {properties.innerPageComputedName ? String(properties.innerPageComputedName) : innerPage}
              </Link>
            </Breadcrumb.Item>
          )}
        </Breadcrumb>
      )}
    </section>
  );
};
