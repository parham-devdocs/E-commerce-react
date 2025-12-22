import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryClient';

const QueryWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
};

export default QueryWrapper;