import { useHref, useNavigate } from 'react-router';

import { HeroUIProvider } from '@heroui/react';
import type { PropsWithChildren } from 'react';

export const HeroUICustomProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  return (
    <HeroUIProvider
      navigate={navigate}
      useHref={useHref}
    >
      {children}
    </HeroUIProvider>
  );
};
