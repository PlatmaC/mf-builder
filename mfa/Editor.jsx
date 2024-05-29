import React from 'react';
import { Editor } from '../src/Editor/Editor';
import AppPartWrapper from './AppPartWrapper';

export default function ({ refreshPointer, activeTab }) {
  return <AppPartWrapper component={Editor} props={{ refreshPointer, activeTab }} />;
}
