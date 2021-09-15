/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
eact-hook-form';

import { Field } from '../../common/Field';
import { NUMBER_REGEX } from '../utils';

const NumberEditor: React.FC<{
  value: number;
  onChange: (value: number) => void;
  name: string;
}> = ({ value, onChange, name }) => {
  const {
    errors,
    formState: { touched },
    register,
    unregister,
    setValue,
    triggerValidation,
  } = useFormContext();

  useEffect(() => {
    register(name, {
      required: 'Required',
      pattern: {
        value: NUMBER_REGEX,
        message: 'Must be a number',
      },
    });

    return () => unregister(name);
  }, [register, unregister, name]);

  async function handleChange(value: string) {
    if (await triggerValidation(name)) {
      onChange(parseFloat(value));
    }
  }

  return (
    <Field
      label="Value"
      defaultValue={value}
      onChange={(e) => {
        setValue(name, e.currentTarget.value);
        handleChange(e.currentTarget.value);
      }}
      error={touched[name] && errors[name]?.message}
    />
  );
};

export default NumberEditor;
