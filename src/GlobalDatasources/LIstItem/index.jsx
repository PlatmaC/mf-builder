import React, { useContext } from 'react';
import cx from 'classnames';
import { GlobalDataSourcesContext } from '..';
import { DataSourceTypes } from '../../Editor/DataSourceManager/SourceComponents';
import { getSvgIcon } from '@/_helpers/appUtils';
import DeleteIcon from '../Icons/DeleteIcon.svg';

export const ListItem = ({ dataSource, key, active, onDelete }) => {
  const { setSelectedDataSource } = useContext(GlobalDataSourcesContext);

  const getSourceMetaData = (dataSource) => {
    if (dataSource.pluginId) {
      return dataSource.plugin?.manifestFile?.data.source;
    }

    return DataSourceTypes.find((source) => source.kind === dataSource.kind);
  };

  const sourceMeta = getSourceMetaData(dataSource);
  const icon = getSvgIcon(sourceMeta.kind.toLowerCase(), 24, 24, dataSource?.plugin?.iconFile?.data);

  const onHandleSelect = () => {
    setSelectedDataSource(dataSource);
  };

  return (
    <div
      key={key}
      className={cx('mx-3 rounded-3 datasources-list', {
        'datasources-list-item': active,
      })}
    >
      <div
        role="button"
        onClick={onHandleSelect}
        className="col d-flex align-items-center overflow-hidden"
        data-cy={`${String(dataSource.name).toLowerCase().replace(/\s+/g, '-')}-button`}
      >
        <div>{icon}</div>

        <div className="font-400 tj-text-xsm text-truncate" style={{ paddingLeft: '6px' }}>
          {dataSource.name}
        </div>
      </div>
      <div className="col-auto">
        <button
          className="ds-delete-btn"
          onClick={() => onDelete(dataSource)}
          data-cy={`${String(dataSource.name).toLowerCase().replace(/\s+/g, '-')}-delete-button`}
        >
          <div>
            <DeleteIcon width="14" height="14" />
          </div>
        </button>
      </div>
    </div>
  );
};
