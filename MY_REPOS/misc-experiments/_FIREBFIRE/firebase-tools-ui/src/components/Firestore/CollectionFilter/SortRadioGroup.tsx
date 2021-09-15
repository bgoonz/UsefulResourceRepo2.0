/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
'react';
import { useFormContext } from 'react-hook-form';

export const SortRadioGroup: React.FC<{ name: string; disabled: boolean }> = ({
  name,
  disabled,
}) => {
  const { register, setValue, unregister, watch } = useFormContext();

  useEffect(() => {
    if (!disabled) {
      register({ name });
    } else {
      setValue(name, undefined);
    }

    return () => unregister(name);
  }, [register, unregister, disabled, name, setValue]);

  const sort = watch(name);

  return (
    <>
      <Radio
        value="asc"
        label="Ascending"
        checked={sort === 'asc'}
        onChange={() => setValue(name, 'asc')}
        disabled={disabled}
      />

      <Radio
        value="desc"
        label="Descending"
        checked={sort === 'desc'}
        onChange={() => setValue(name, 'desc')}
        disabled={disabled}
      />
    </>
  );
};
