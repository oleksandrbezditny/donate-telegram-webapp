import { FC, useCallback } from 'react';
import styles from './NumberField.module.scss';

export type NumberFieldProps = Readonly<{
  value?: number;
  onChange: (newValue: number) => void;
  max: number;
  placeholder?: string;
}>;

export const NumberField: FC<NumberFieldProps> = ({ value, onChange, max, placeholder = '' }) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(event.target.value);

      if (isNaN(newValue)) {
        onChange(0);
      }

      if (!isNaN(newValue) && (max === undefined || newValue <= max)) {
        onChange(parseFloat(event.target.value));
      }
    },
    [onChange, max]
  );

  return (
    <div className={styles.container}>
      <input
        type="number"
        value={value && value.toString()}
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
};
