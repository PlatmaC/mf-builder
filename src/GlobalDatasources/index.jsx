import React, { createContext, useMemo, useState, useEffect, useContext } from 'react';
// import Layout from '@/_ui/Layout';
import { globalDatasourceService, appEnvironmentService, authenticationService } from '@/_services';
import { GlobalDataSourcesPage } from './GlobalDataSourcesPage';
import { BreadCrumbContext } from '@/App/App';

export const GlobalDataSourcesContext = createContext({
  showDataSourceManagerModal: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleDataSourceManagerModal: () => {},
  selectedDataSource: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSelectedDataSource: () => {},
});

export const GlobalDatasources = (props) => {
  const { admin } = authenticationService.currentSessionValue;
  const [selectedDataSource, setSelectedDataSource] = useState(null);
  const [dataSources, setDataSources] = useState([]);
  const [showDataSourceManagerModal, toggleDataSourceManagerModal] = useState(false);
  const [isEditing, setEditing] = useState(true);
  const [environments, setEnvironments] = useState([]);
  const [currentEnvironment, setCurrentEnvironment] = useState(null);
  const { updateSidebarNAV } = useContext(BreadCrumbContext);

  useEffect(() => {
    if (dataSources?.length == 0) updateSidebarNAV('');
    else selectedDataSource ? updateSidebarNAV(selectedDataSource.name) : updateSidebarNAV(dataSources?.[0].name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(dataSources), JSON.stringify(selectedDataSource)]);

  useEffect(() => {
    fetchEnvironments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin]);

  // eslint-disable-next-line no-unused-vars
  const fetchDataSources = async (_resetSelection = false, _dataSource = null) => {
    globalDatasourceService
      .getAll()
      .then((data) => {
        const orderedDataSources = data.data_sources.sort((a, b) => a.name.localeCompare(b.name));
        setDataSources([...(orderedDataSources ?? [])]);
        // const ds = dataSource && orderedDataSources.find((ds) => ds.id === dataSource.id);
      })
      .catch(() => {
        setDataSources([]);
      });
  };

  const handleToggleSourceManagerModal = () => {
    toggleDataSourceManagerModal(
      (prevState) => !prevState,
      () => setEditing((prev) => !prev)
    );
  };

  const handleModalVisibility = () => {
    if (selectedDataSource) {
      return setSelectedDataSource(null, () => handleToggleSourceManagerModal());
    }

    handleToggleSourceManagerModal();
  };

  const fetchEnvironments = () => {
    appEnvironmentService.getAllEnvironments().then((data) => {
      const envArray = data?.environments;
      setEnvironments(envArray);
      if (envArray.length > 0) {
        const env = envArray.find((env) => env.is_default === true);
        setCurrentEnvironment(env);
      }
    });
  };

  const value = useMemo(
    () => ({
      selectedDataSource,
      setSelectedDataSource,
      fetchDataSources,
      dataSources,
      showDataSourceManagerModal,
      toggleDataSourceManagerModal,
      handleModalVisibility,
      isEditing,
      setEditing,
      fetchEnvironments,
      environments,
      currentEnvironment,
      setCurrentEnvironment,
      setDataSources,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedDataSource, dataSources, showDataSourceManagerModal, isEditing, environments, currentEnvironment]
  );

  return (
    <GlobalDataSourcesContext.Provider value={value}>
      <div className="page-wrapper">
        <GlobalDataSourcesPage darkMode={props.darkMode} />
      </div>
    </GlobalDataSourcesContext.Provider>
  );
};
