/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import { Field } from '../../common/Field';

const StringEditor: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  return (
    <Field
      value={value}
      outlined
      label="Value"
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default StringEditor;
