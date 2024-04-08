// logic was taken from tooljet repository and refactored as much as it's possible

import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { TooljetDatabaseContextType } from '@/types/DBTypes/ContextTypes';
import { ButtonSolid } from '@/_ui/AppButton/AppButton';
import { tooljetDatabaseService } from '@/_services';
import { pluralize } from '@/_helpers/utils';
import SolidIcon from '@/_ui/Icon/SolidIcons';
import Drawer from '@/_ui/Drawer';

import { TooljetDatabaseContext } from '../../index';
import { FileDropzone } from './FileDropzone';

export type BulkUploadErrorType = { client: string; server: string };

const BulkUploadDrawer = () => {
  const [isBulkUploadDrawerOpen, setIsBulkUploadDrawerOpen] = useState(false);
  const [isDownloadingTemplate, setIsDownloadingTemplate] = useState(false);
  const [bulkUploadFile, setBulkUploadFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<BulkUploadErrorType>({ client: '', server: '' });
  const [isBulkUploading, setIsBulkUploading] = useState(false);
  const {
    setSelectedTableData,
    resetFilterQuery,
    setTotalRecords,
    setQueryFilters,
    organizationId,
    setSortFilters,
    resetSortQuery,
    selectedTable,
    columns,
  } = useContext(TooljetDatabaseContext) as TooljetDatabaseContextType;

  useEffect(() => setErrors({ client: '', server: '' }), [bulkUploadFile]);
  useEffect(() => {
    if (!isBulkUploadDrawerOpen) {
      setErrors({ client: '', server: '' });
      setBulkUploadFile(null);
    }
  }, [isBulkUploadDrawerOpen]);

  const handleBulkUpload = async (event) => {
    event.preventDefault();
    if (bulkUploadFile) {
      setErrors({ client: '', server: '' });
      setIsBulkUploading(true);
      const formData = new FormData();
      formData.append('file', bulkUploadFile);
      try {
        const { error, data } = await tooljetDatabaseService.bulkUpload(organizationId, selectedTable, formData);
        if (error) {
          setErrors({ ...errors, ...{ server: error.message } });
          toast.error('Upload failed!', { position: 'top-center' });
        } else {
          const { rowsInserted, rowsUpdated } = data.result;
          toast.success(`${pluralize(rowsInserted, 'new row')} added, ` + `${pluralize(rowsUpdated, 'row')} updated.`, {
            position: 'top-center',
          });
          const {
            data: newTableData,
            headers,
            error,
          } = await tooljetDatabaseService.findOne(organizationId, selectedTable, 'order=id.desc');
          if (error) toast.error(error?.message ?? 'Something went wrong');
          else {
            const totalRecords = headers['content-range'].split('/')[1] || 0;
            if (Array.isArray(newTableData)) {
              (setTotalRecords as (count: string | number) => void)(totalRecords);
              setSelectedTableData(newTableData);
            }
          }
          setTimeout(() => setIsBulkUploadDrawerOpen(false), 200); // Timeout just for animation and UX
          setBulkUploadFile(null);
          setQueryFilters({});
          resetFilterQuery();
          setSortFilters({});
          resetSortQuery();
        }
      } catch (error) {
        toast.error(error.errors, { position: 'top-center' });
      } finally {
        setIsBulkUploading(false);
      }
    }
  };

  const handleTemplateDownload = () => {
    setIsDownloadingTemplate(true);
    setTimeout(() => {
      const headerRow = columns.map((col) => col.Header).join(',');
      const csvContent = [headerRow].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const href = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = `${selectedTable}.csv`;
      link.click();
      window.URL.revokeObjectURL(href);
      setIsDownloadingTemplate(false);
    }, 300); // Timeout just for animation and UX
  };

  return (
    <>
      <button
        onClick={() => setIsBulkUploadDrawerOpen(!isBulkUploadDrawerOpen)}
        className={`ghost-black-operation ${isBulkUploadDrawerOpen ? 'open' : ''}`}
      >
        <SolidIcon name="fileupload" width="14" fill={isBulkUploadDrawerOpen ? '#3E63DD' : '#889096'} />
        <span className="tj-text-xsm font-weight-500" style={{ marginLeft: '6px' }}>
          Bulk upload data
        </span>
      </button>

      <Drawer onClose={() => setIsBulkUploadDrawerOpen(false)} isOpen={isBulkUploadDrawerOpen} position="right">
        <div className="drawer-card-wrapper">
          <div className="drawer-card-title ">
            <h3 className="" data-cy="create-new-column-header">
              Bulk upload data
            </h3>
          </div>
          <div className="card-body">
            <div className="manage-users-drawer-content-bulk">
              <div className="manage-users-drawer-content-bulk-download-prompt">
                <div className="user-csv-template-wrap">
                  <div>
                    <SolidIcon name="information" fill="#F76808" width="26" />
                  </div>
                  <div>
                    <p className="tj-text tj-text-sm" data-cy="helper-text-bulk-upload">
                      {`Download the template to add your data or format your file in the same as the template. Platma
                      won't be able to recognise files in any other format.`}
                    </p>
                    <ButtonSolid
                      data-cy="button-download-template"
                      isLoading={isDownloadingTemplate}
                      className="download-template-btn"
                      onClick={handleTemplateDownload}
                      variant="tertiary"
                      leftIcon="file01"
                      iconWidth="13"
                    >
                      Download Template
                    </ButtonSolid>
                  </div>
                </div>
              </div>
              <FileDropzone
                handleFileChange={(file: File) => setBulkUploadFile(file)}
                fileData={bulkUploadFile}
                setErrors={setErrors}
                errors={errors}
              />
            </div>
          </div>
        </div>
        <div className="position-sticky bottom-0 right-0 w-100  mt-auto">
          <div className="d-flex justify-content-end drawer-footer-btn-wrap">
            <ButtonSolid variant="tertiary" data-cy={`cancel-button`} onClick={() => setIsBulkUploadDrawerOpen(false)}>
              Cancel
            </ButtonSolid>
            <ButtonSolid
              disabled={!bulkUploadFile || errors.client.length > 0 || errors.server.length > 0}
              data-cy={`save-changes-button`}
              isLoading={isBulkUploading}
              onClick={handleBulkUpload}
              leftIcon="floppydisk"
              loadingWithChildren
              fill="#fff"
            >
              Upload data
            </ButtonSolid>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default BulkUploadDrawer;
