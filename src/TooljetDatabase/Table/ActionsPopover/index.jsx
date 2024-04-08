import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import DeleteIcon from './Icons/Delete.svg';
import EditIcon from './Icons/Edit.svg';

// eslint-disable-next-line no-unused-vars
export const TablePopover = ({ disabled, children, onDelete, onRename }) => {
  if (disabled) return children;
  const popover = (
    <Popover>
      <Popover.Body>
        {onRename && (
          <div className="w-min-100 row cursor-pointer" onClick={onRename}>
            <div className="col-auto">
              <EditIcon />
            </div>
            <div className="col text-truncate">Edit</div>
          </div>
        )}
        {onDelete && (
          <div className="w-min-100 mt-3 row cursor-pointer" onClick={onDelete}>
            <div className="col-auto">
              <DeleteIcon />
            </div>
            <div className="col text-truncate" data-cy="column-delete-option">
              Delete
            </div>
          </div>
        )}
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger rootClose trigger="click" placement="bottom" overlay={popover}>
      {children}
    </OverlayTrigger>
  );
};
