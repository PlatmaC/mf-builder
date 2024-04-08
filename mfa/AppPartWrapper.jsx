import React, { memo, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@assets/translations/en.json';
import { BreadCrumbContext } from '../src/App/App';
import Toast from '@/_ui/Toast';
import './fetch-override';

// import ErrorBoundary from '../src/Editor/ErrorBoundary';

i18n.use(initReactI18next).init({
  resources: {
    en,
  },
  fallbackLng: 'en',
  lng: 'en',
});

export function AppPartWrapper({ component: Component, props = {} }) {
  const [sidebarNav, updateSidebarNAV] = useState();
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

  const switchDarkMode = (newMode) => {
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  let toastOptions = {
    duration: 7000,
    style: {
      wordBreak: 'break-all',
    },
  };

  if (darkMode) {
    toastOptions = {
      duration: 7000,
      className: 'toast-dark-mode',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        wordBreak: 'break-all',
      },
    };
  }

  return (
    <BreadCrumbContext.Provider value={{ sidebarNav, updateSidebarNAV }}>
      <div className={`main-wrapper ${darkMode ? 'theme-dark dark-theme' : ''}`}>
        <Component {...props} switchDarkMode={switchDarkMode} darkMode={darkMode} />
      </div>
      <Toast toastOptions={toastOptions} />
    </BreadCrumbContext.Provider>
  );
}

export default memo(AppPartWrapper);
