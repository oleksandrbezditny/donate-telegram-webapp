import { WithConnectedWallet } from './components/WithConnectedWallet';
import { WalletView } from './components/WalletView/WalletView.tsx';
import { LanguageSelector } from './components';
import { useTonWallet } from '@tonconnect/ui-react';

function App() {
  const wallet = useTonWallet();

  return (
    <>
      <LanguageSelector />
      <WalletView />
      {wallet && <WithConnectedWallet />}
    </>
  );
}

export default App;
