import { ReactElement } from 'react';
import { useWrapLazyOperation } from '../../hooks';
import { Loader } from '../Loader';

export type WithLoadingProps<TReturn = unknown> = Readonly<{
  resourceRequester: () => Promise<TReturn>;
  children: (result: TReturn) => ReactElement;
}>;

export function WithLoading<TReturn>({
  resourceRequester,
  children,
}: WithLoadingProps<TReturn>): ReactElement {
  const { loading, result } = useWrapLazyOperation(resourceRequester);

  if (loading) {
    return <Loader display={true} />;
  }

  return <>{result && children(result)}</>;
}
