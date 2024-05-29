import { useTranslation } from 'react-i18next';

import defaultStyles from '@/_ui/Select/styles';
import Select from '@/_ui/Select';

export const HidePage = ({ pages, event, handlerChanged, eventIndex, darkMode }) => {
  const { t } = useTranslation();

  const styles = {
    ...defaultStyles(darkMode),
    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
    menuList: (base) => ({
      ...base,
    }),
  };

  return (
    <div className="p-1 switch-page" data-cy={`switch-page-label-and-input`}>
      <label className="form-label mt-1">{t('globals.page', 'Page')}</label>
      <Select
        options={pages}
        search={true}
        value={event.pageId}
        onChange={(value) => {
          handlerChanged(eventIndex, 'pageId', value);
        }}
        placeholder={t('globals.select', 'Select') + '...'}
        styles={styles}
        useMenuPortal={false}
        className={`${darkMode ? 'select-search-dark' : 'select-search'}`}
        useCustomStyles={true}
        customWrap={undefined}
      />
    </div>
  );
};
