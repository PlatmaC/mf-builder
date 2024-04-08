import React from 'react';
import { List } from '../List';

export const Sidebar = ({ updateSelectedDatasource }) => {
  return (
    <div className="global-datasources-sidebar col border-bottom">
      <div className="col border-end">
        <div className="datasources-list-title  tj-text-sm font-weight-500">Global Data Sources</div>

        <div className="datasources-list-subtitle  tj-text-sm font-weight-500">Data Sources</div>

        <div className="datasources-list-subtitle  tj-text-sm font-weight-500">Added Data Sources</div>

        <div className="datasources-list-box">
          <List updateSelectedDatasource={updateSelectedDatasource} />
        </div>
      </div>
    </div>
  );
};
