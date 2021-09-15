/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import { SelectField } from '../../common/Field';

const BooleanEditor: React.FC<{
  value: boolean;
  onChange: (value: boolean) => void;
}> = ({ value, onChange }) => {
  return (
    <SelectField
      label="Value"
      value={value.toString()}
      options={['true', 'false']}
      onChange={(e) => {
        onChange(e.currentTarget.value === 'true');
      }}
    />
  );
};

export default BooleanEditor;
