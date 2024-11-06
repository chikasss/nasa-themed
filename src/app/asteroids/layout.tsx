import React from 'react';
import { AsteroidsProvider } from './AsteroidsContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AsteroidsProvider>
      {children}
    </AsteroidsProvider>
  );
};

export default Layout;
