import { useState } from 'react';

export type WrappedLazyOperation<TResult> = Readonly<{
  loading: boolean;
  result: TResult | undefined;
  error: string;
}>;

export const wrapLazyOperation = <TParams, TReturn>(
  func: (...args: TParams[]) => Promise<TReturn>
): ((...args: TParams[]) => WrappedLazyOperation<TReturn>) => {
  return (...args) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState<TReturn | undefined>(undefined);

    setLoading(true);

    func(...args)
      .then(
        (res) => setResult(res),
        (err) => setError(err)
      )
      .finally(() => setLoading(false));

    return {
      loading,
      result,
      error,
    } as const;
  };
};
