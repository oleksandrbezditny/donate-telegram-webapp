import { useEffect, useMemo, useState } from 'react';

export type WrappedAsyncOutput<TResult> = Readonly<{
  loading: boolean;
  error: string;
  result?: TResult;
}>;

export const useWrapAsync = <TReturn>(
  func: () => Promise<TReturn>
): WrappedAsyncOutput<TReturn> => {
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
  }, [func]);

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
