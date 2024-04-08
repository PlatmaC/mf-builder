import React from 'react';
import AppPartWrapper from './AppPartWrapper';

import { TooljetDatabase } from '../src/TooljetDatabase';

export default function ({ refreshPointer }) {
  return <AppPartWrapper component={TooljetDatabase} props={{ refreshPointer }} />;
}
