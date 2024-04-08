import React from 'react';
import cx from 'classnames';
import { Breadcrumbs } from '../Breadcrumbs';
// import { useLocation } from 'react-router-dom';

function Header() {
  // const backToAppUrl = localStorage.getItem('backToAppUrl');
  // const backToAppUrl = 'http://localhost:8082/apps/605/xx';

  const currentVersion = localStorage.getItem('currentVersion');
  const darkMode = localStorage.getItem('darkMode') === 'true';

  // const routes = (path) => {
  //   switch (path) {
  //     case 'workspaceId':
  //       return 'Applications';
  //     case 'database':
  //       return 'Database';
  //     case 'workspace-settings':
  //       return 'Workspace settings';
  //     case 'global-datasources':
  //       return 'Datasources';
  //     case 'settings':
  //       return 'Profile settings';
  //     case 'integrations':
  //       return 'Integrations';
  //     default:
  //       return 'Applications';
  //   }
  // };
  // const location = useLocation();

  // const backToAppHandler = () => {
  //   if (backToAppUrl) {
  //     localStorage.setItem('backToAppUrl', '');
  //     history.pushState({}, '', backToAppUrl);
  //   }
  // };

  return (
    <header className="layout-header">
      <div className="row w-100 gx-0">
        {/* <div className="tj-dashboard-section-header">
          {backToAppUrl ? (
            <div className="back-to-app" onClick={backToAppHandler}>
              {' '}
              <img
                data-cy="button-back-ds-connection-modal"
                className="m-0"
                src="assets/images/icons/back.svg"
                width="20"
                height="20"
              />{' '}
              Back to Application !!!!
            </div>
          ) : (
            <p className="tj-text-md font-weight-500" data-cy="dashboard-section-header">
              {routes(location?.pathname.split('/').pop())}
            </p>
          )}
        </div> */}
        <div className="col tj-dashboard-header-wrap">
          <div className="d-flex justify-content-sm-between">
            <div className="app-header-label" data-cy="app-header-label">
              <Breadcrumbs darkMode={darkMode} />
            </div>
            <div
              className={cx('ms-auto tj-version tj-text-xsm', {
                'color-muted-darkmode': darkMode,
                'color-disabled': !darkMode,
              })}
              data-cy="version-label"
            >
              Version {currentVersion}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
