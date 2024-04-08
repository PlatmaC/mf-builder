/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, useMemo, useEffect, useContext } from 'react';
import Header from '@/_ui/Header';
import TooljetDatabasePage from './TooljetDatabasePage';
import { usePostgrestQueryBuilder } from './usePostgrestQueryBuilder';
import { authenticationService } from '../_services/authentication.service';
import { BreadCrumbContext } from '@/App/App';

export const TooljetDatabaseContext = createContext({
  organizationId: null,
  setOrganizationId: () => {},
  selectedTable: '',
  setSelectedTable: () => {},
  searchParam: '',
  setSearchParam: () => {},
  selectedTableData: [],
  setSelectedTableData: () => {},
  tables: [],
  setTables: () => {},
  columns: [],
  setColumns: () => {},
  totalRecords: 0,
  setTotalRecords: () => {},
  handleBuildFilterQuery: () => {},
  handleBuildSortQuery: () => {},
  buildPaginationQuery: () => {},
  resetSortQuery: () => {},
  resetFilterQuery: () => {},
  queryFilters: {},
  setQueryFilters: () => {},
  sortFilters: {},
  setSortFilters: () => {},
  resetAll: () => {},
});

export const TooljetDatabase = ({ refreshPointer }) => {
  const [organizationId, setOrganizationId] = useState(
    authenticationService?.currentSessionValue?.current_organization_id
  );
  const [columns, setColumns] = useState([]);
  const [tables, setTables] = useState([]);
  const [searchParam, setSearchParam] = useState('');
  const [selectedTable, setSelectedTable] = useState('');
  const [selectedTableData, setSelectedTableData] = useState([]);

  const [totalRecords, setTotalRecords] = useState(0);

  const [queryFilters, setQueryFilters] = useState({});
  const [sortFilters, setSortFilters] = useState({});

  const {
    handleBuildFilterQuery,
    handleBuildSortQuery,
    buildPaginationQuery,
    resetSortQuery,
    resetFilterQuery,
    resetAll,
  } = usePostgrestQueryBuilder({
    organizationId,
    selectedTable,
    setSelectedTableData,
    setTotalRecords,
  });

  const value = useMemo(
    () => ({
      searchParam,
      setSearchParam,
      organizationId,
      setOrganizationId,
      tables,
      setTables,
      columns,
      setColumns,
      selectedTable,
      setSelectedTable,
      selectedTableData,
      setSelectedTableData,
      totalRecords,
      setTotalRecords,
      handleBuildFilterQuery,
      handleBuildSortQuery,
      buildPaginationQuery,
      resetSortQuery,
      resetFilterQuery,
      queryFilters,
      setQueryFilters,
      sortFilters,
      setSortFilters,
      resetAll,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      searchParam,
      organizationId,
      tables,
      columns,
      selectedTable,
      selectedTableData,
      totalRecords,
      queryFilters,
      sortFilters,
    ]
  );

  const { updateSidebarNAV } = useContext(BreadCrumbContext);

  useEffect(() => {
    updateSidebarNAV('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ height: '80vh' }} className="col">
      <div style={{ marginLeft: -60 }}>
        <Header />
      </div>
      <div style={{ paddingTop: 64 }}>
        <TooljetDatabaseContext.Provider value={value}>
          <TooljetDatabasePage totalTables={tables.length || 0} refreshPointer={refreshPointer} />
        </TooljetDatabaseContext.Provider>
      </div>
    </div>
  );
};
