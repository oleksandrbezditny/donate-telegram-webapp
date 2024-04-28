import { useEffect, useMemo, useState } from 'react';

export type WrappedLazyOperation<TResult> = Readonly<{
  loading: boolean;
  result: TResult | undefined;
  error: string;
}>;

export const useWrapLazyOperation = <TReturn>(
  func: () => Promise<TReturn>
): WrappedLazyOperation<TReturn> => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [result, setResult] = useState<TReturn | undefined>(undefined);

  useEffect(() => {
    func()
      .then(
        (res) => setResult(res),
        (err) => setError(err)
      )
      .finally(() => setLoading(false));
  }, []);

  return useMemo(
    () =>
      ({
        loading,
        result,
        error,
      }) as const,
    [loading, result, error]
  );
};
