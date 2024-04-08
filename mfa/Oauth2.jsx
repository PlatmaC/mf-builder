import React from 'react';
import AppPartWrapper from './AppPartWrapper';

import { Authorize } from '../src/Oauth2';

export default function () {
  return <AppPartWrapper component={Authorize} />;
}
