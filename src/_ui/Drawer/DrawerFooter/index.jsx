import { ButtonSolid } from '../../AppButton/AppButton';

function DrawerFooter({ fetching, onClose, isEditMode = false, onCreate, onEdit, submitButtonProps = {} }) {
  return (
    <div className="position-sticky bottom-0 right-0 w-100  mt-auto">
      <div className="d-flex justify-content-end drawer-footer-btn-wrap">
        <ButtonSolid variant="tertiary" data-cy={`cancel-button`} onClick={onClose}>
          Cancel
        </ButtonSolid>
        {isEditMode ? (
          <ButtonSolid
            data-cy={`save-changes-button`}
            leftIcon="floppydisk"
            disabled={fetching}
            onClick={onEdit}
            fill="#fff"
            {...submitButtonProps}
          >
            Save changes
          </ButtonSolid>
        ) : (
          <ButtonSolid
            onClick={() => onCreate?.()}
            data-cy={`create-button`}
            {...submitButtonProps}
            disabled={fetching}
          >
            Create
          </ButtonSolid>
        )}
      </div>
    </div>
  );
}

export default DrawerFooter;
