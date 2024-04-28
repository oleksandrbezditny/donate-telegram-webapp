import { ReactElement } from 'react';
import { useWrapAsync } from '../../hooks';
import { Loader } from '../Loader';

export type WithLoadingProps<TReturn = unknown> = Readonly<{
  asyncFunc: () => Promise<TReturn>;
  children: (result: TReturn) => ReactElement;
}>;

export function WithLoading<TReturn>({
  asyncFunc,
  children,
}: WithLoadingProps<TReturn>): ReactElement {
  const { loading, result } = useWrapAsync(asyncFunc);

  if (loading) {
    return <Loader display={true} />;
  }

  return <>{result && children(result)}</>;
}
