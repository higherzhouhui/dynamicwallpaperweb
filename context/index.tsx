import React from 'react';
import {ThemeProvider} from 'styled-components';

const TT = ThemeProvider as any;
import {lightTheme} from '@/uikit';

type ProvidersProps = {
  children: any
};

const Providers: React.FC<ProvidersProps> = ({children}) => {
  return <TT theme={lightTheme}>{children}</TT>;
};

export default Providers;
