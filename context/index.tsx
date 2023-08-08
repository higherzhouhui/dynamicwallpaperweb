import React from 'react';
import {ThemeProvider} from 'styled-components';

import {lightTheme} from '@/uikit';

type ProvidersProps = {};

const Providers: React.FC<ProvidersProps> = ({children}) => {
  return <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>;
};

export default Providers;
