import React from 'react';
import cx from 'classnames';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import SolidIcon from '@/_ui/Icon/SolidIcons';
import Spinner from '@/_ui/Spinner';

import DeleteIcon from './Icons/Delete.svg';
import CloneIcon from './Icons/Clone.svg';
import EditIcon from './Icons/Edit.svg';

export const ListItemPopover = ({ onEdit, onDelete, darkMode, onClone, isCloning }) => {
  const [open, setOpen] = React.useState(false);

  const popover = (
    <Popover id="popover-contained" className={`table-list-items ${darkMode && 'dark-theme'}`}>
      <Popover.Body className={`${darkMode && 'theme-dark'}`}>
        <div className={`row cursor-pointer flex-nowrap`}>
          <div className="col-4 d-flex justify-content-center" data-cy="edit-option-icon">
            <EditIcon />
          </div>
          <div
            className="text-truncate"
            data-cy="edit-option"
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
          >
            Edit
          </div>
        </div>
        <div
          className={cx('row mt-3 cursor-pointer flex-nowrap', { ['pointer-events-none']: isCloning })}
          onClick={onClone}
        >
          <div className="col-4 d-flex justify-content-center">
            {isCloning ? <Spinner size="small" /> : <CloneIcon />}
          </div>
          <div className="text-truncate">Duplicate</div>
        </div>
        <div className="row mt-3 cursor-pointer flex-nowrap">
          <div className="col-4 d-flex justify-content-center" data-cy="delete-option-icon">
            <DeleteIcon />
          </div>
          <div className="text-truncate" data-cy="delete-option" onClick={onDelete}>
            Delete
          </div>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <div
      className={cx(`float-right cursor-pointer table-list-item-popover`, {
        'd-grid': open,
      })}
      data-cy="table-kebab-icon"
    >
      <OverlayTrigger
        onToggle={(isOpen) => {
          setOpen(isOpen);
        }}
        show={open}
        rootClose
        trigger="click"
        placement="bottom"
        overlay={popover}
        transition={false}
      >
        <span>
          <SolidIcon name="morevertical" width="14" fill={darkMode ? '#FDFDFE' : '#11181C'} />
        </span>
      </OverlayTrigger>
    </div>
  );
};
