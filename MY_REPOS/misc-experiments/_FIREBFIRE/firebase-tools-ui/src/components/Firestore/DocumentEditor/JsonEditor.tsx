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
import { FirestoreAny } from '../models';

const JsonEditor: React.FC<{
  value: FirestoreAny;
  onChange: (value: FirestoreAny) => void;
  name: string;
}> = ({ value, onChange, name }) => {
  const [initialValue] = useState(JSON.stringify(value));
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
      validate: (e) => {
        try {
          JSON.parse(e);
          return true;
        } catch {
          return 'Must be valid JSON';
        }
      },
    });

    return () => unregister(name);
  }, [register, unregister, name]);

  async function handleChange(value: string) {
    if (await triggerValidation(name)) {
      onChange(JSON.parse(value));
    }
  }

  return (
    <Field
      label="JSON"
      defaultValue={initialValue}
      onChange={(e) => {
        setValue(name, e.currentTarget.value);
        handleChange(e.currentTarget.value);
      }}
      error={touched[name] && errors[name]?.message}
    />
  );
};

export default JsonEditor;
