import { BrowserRouter } from 'react-router';
import { HeroUICustomProvider } from './HeroUI/HeroUICustomProvider';
import { RoutesProvider } from './Router/RoutesProvider';
import { TsQueryProvider } from './TanstackQuery/TsQueryProvider';

const Providers = () => {
  return (
    <TsQueryProvider>
      <BrowserRouter>
        <HeroUICustomProvider>
          <RoutesProvider />
        </HeroUICustomProvider>
      </BrowserRouter>
    </TsQueryProvider>
  );
};
export default Providers;
