import React from 'react';
// eslint-disable-next-line import/no-unresolved
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@assets/translations/en.json';
import { App } from '../src/App';

i18n.use(initReactI18next).init({
  resources: {
    en,
  },
  fallbackLng: 'en',
  lng: 'en',
});

export default function () {
  return <App />;
}
