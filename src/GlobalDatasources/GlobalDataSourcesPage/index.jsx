import React, { useContext, useRef, useState, useEffect, useMemo } from 'react';
import cx from 'classnames';
import { Sidebar } from '../Sidebar';
import { GlobalDataSourcesContext } from '..';
import { DataSourceManager } from '../../Editor/DataSourceManager';
import { useNavigate } from 'react-router-dom';

export const GlobalDataSourcesPage = ({ darkMode = false }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [modalProps, setModalProps] = useState({
    backdrop: false,
    dialogClassName: `datasource-edit-modal`,
    enforceFocus: false,
  });

  const {
    // dataSources,
    setSelectedDataSource,
    selectedDataSource,
    fetchDataSources,
    showDataSourceManagerModal,
    // toggleDataSourceManagerModal,
    // handleModalVisibility,
    isEditing,
    // setEditing,
    currentEnvironment,
    environments,
    setCurrentEnvironment,
  } = useContext(GlobalDataSourcesContext);

  useEffect(() => {
    if (selectedDataSource) {
      setModalProps({ ...modalProps, backdrop: false });
    }

    if (!isEditing) {
      setModalProps({ ...modalProps, backdrop: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDataSource, isEditing]);

  const environmentChanged = (env) => {
    setCurrentEnvironment(env);
  };

  const dataSourcesChanged = (resetSelection, dataSource) => {
    setCurrentEnvironment(environments[0]);
    fetchDataSources(resetSelection, dataSource);
  };

  const backToAppHandler = () => {
    const backToAppUrl = localStorage.getItem('backToAppUrl');
    if (backToAppUrl) {
      localStorage.setItem('backToAppUrl', '');
    }
    navigate(backToAppUrl || '/apps');
  };

  const handleBreadcrumbsClick = (index) => {
    if (!index) {
      setSelectedDataSource(null);
    }
  };

  const breadcrumbs = useMemo(() => {
    const base = selectedDataSource?.id ? 'Added Data Sources' : 'Data Sources';
    const name = selectedDataSource?.name ? selectedDataSource?.name : null;
    return name ? [base, '>', name] : [base];
  }, [selectedDataSource]);

  return (
    <div className="datasource-page">
      <header className="datasource-header">
        <div className="row w-100 gx-0">
          <div className="tj-dashboard-section-header">
            <div className="back-to-app" onClick={backToAppHandler}>
              {' '}
              <img
                data-cy="button-back-ds-connection-modal"
                className="m-0"
                src="assets/images/icons/back.svg"
                width="20"
                height="20"
              />{' '}
              Back to Application
            </div>
          </div>
          <div className="col tj-dashboard-header-wrap">
            <div className="d-flex justify-content-sm-between">
              <div className="app-header-label" data-cy="app-header-label">
                {breadcrumbs.map((breadcrumb, index) => {
                  return (
                    <span className="breadcrumbs-items" key={breadcrumb} onClick={() => handleBreadcrumbsClick(index)}>
                      {breadcrumb}
                    </span>
                  );
                })}
              </div>
              <div
                className={cx('ms-auto tj-version tj-text-xsm', {
                  'color-muted-darkmode': darkMode,
                  'color-disabled': !darkMode,
                })}
                data-cy="version-label"
              >
                {/* Version {currentVersion} */}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="datasource-page row gx-0">
        <Sidebar />
        <div ref={containerRef} className={cx('col animation-fade datasource-modal-container', {})}>
          {containerRef && containerRef?.current && (
            <DataSourceManager
              showBackButton={selectedDataSource ? false : true}
              showDataSourceManagerModal={showDataSourceManagerModal}
              darkMode={darkMode}
              scope="global"
              dataSourcesChanged={dataSourcesChanged}
              selectedDataSource={selectedDataSource}
              setSelectedDataSource={setSelectedDataSource}
              modalProps={modalProps}
              currentEnvironment={currentEnvironment}
              environments={environments}
              environmentChanged={environmentChanged}
              container={selectedDataSource ? containerRef?.current : null}
              isEditing={isEditing}
            />
          )}
        </div>
      </div>
    </div>
  );
};
