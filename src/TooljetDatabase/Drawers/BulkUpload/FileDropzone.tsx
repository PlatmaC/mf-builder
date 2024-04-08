import { useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';
import { useRef } from 'react';

import SolidIcon from '@/_ui/Icon/SolidIcons';
import BulkIcon from '@/_ui/Icon/BulkIcons';

import { BulkUploadErrorType } from './BulkUploadDrawer';

type FileDropzoneProps = {
  setErrors: (errors: BulkUploadErrorType) => void;
  handleFileChange: (file: File | null) => void;
  errors: BulkUploadErrorType;
  fileData: File | null;
};

export function FileDropzone({ handleFileChange, fileData, errors, setErrors }: FileDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted: (acceptedFiles) => {
      if (Math.round(acceptedFiles[0].size / 1024) > 2 * 1024) {
        setErrors({ server: '', client: 'File size cannot exceed more than 2MB' });
        toast.error('File size cannot exceed more than 2MB');
      } else handleFileChange(acceptedFiles[0]);
    },
    onDropRejected: (info) =>
      info.forEach((fileInfo) => fileInfo.errors.forEach((error) => toast.error(error.message))),
    onFileDialogCancel: () => toast.error('Please upload a CSV file'),
    accept: { 'text/csv': ['.csv'] },
    noKeyboard: true,
    noClick: true,
    maxFiles: 1,
  });
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  return (
    <form
      {...getRootProps({ className: 'dropzone' })}
      onClick={() => hiddenFileInput.current?.click()}
      style={{ cursor: 'pointer' }}
      className="upload-user-form"
      id="onButtonClick"
      noValidate
    >
      <div className="form-group">
        <div>
          <div className="csv-upload-icon-wrap" data-cy="icon-bulk-upload">
            <BulkIcon name="fileupload" width="27" fill="#3E63DD" />
          </div>
          <p className="tj-text tj-text-md font-weight-500 select-csv-text" data-cy="helper-text-select-file">
            Select a CSV file to upload
          </p>
          <span className="tj-text tj-text-sm drag-and-drop-text" data-cy="helper-text-drop-file">
            {!isDragActive ? 'Or drag and drop it here' : ''}
          </span>
          <input
            onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
            data-cy="input-field-bulk-upload"
            style={{ display: 'none' }}
            className="form-control"
            {...getInputProps()}
            ref={hiddenFileInput}
            multiple={false}
            accept=".csv"
            type="file"
          />
          {fileData?.name && <p data-cy="uploaded-file-data">{` ${fileData?.name} - ${fileData?.size} bytes`}</p>}
        </div>
        {errors.client && (
          <>
            <p>
              <SolidIcon name="reloaderror" width="16" height="17" />
              <span className="file-upload-error">Kindly check the file and try again!</span>
            </p>
            <p>
              <span className="file-upload-error">{errors.client}</span>
            </p>
          </>
        )}
        {errors.server && (
          <>
            <p>
              <SolidIcon name="reloaderror" width="16" height="17" />
              <span className="file-upload-error">Kindly check the file and try again!</span>
            </p>
            <p>
              <span className="file-upload-error">{errors.server}</span>
            </p>
          </>
        )}
      </div>
    </form>
  );
}
