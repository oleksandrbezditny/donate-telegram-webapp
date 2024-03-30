import { AuthorizedPage } from './components/AuthorizedPage';
import { useCallback, useState } from 'react';
import { UnauthorizedPage } from './components/UnauthorizedPage/UnauthorizedPage.tsx';
import { LanguageSelector } from './components';

function App() {
  const [authorized, setAuthorized] = useState(false);

  const onAuthorization = useCallback(() => {
    setAuthorized(true);
  }, [setAuthorized]);

  return (
    <>
      <LanguageSelector />
      {authorized ? <AuthorizedPage /> : <UnauthorizedPage onAuthorize={onAuthorization} />}
    </>
  );
}

export default App;
