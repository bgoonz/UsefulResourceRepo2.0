/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
/icon-button';
import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import styles from './CollectionFilter.module.scss';
import { ConditionEntry } from './ConditionEntry';

export const ConditionEntries: React.FC<{ name: string }> = ({ name }) => {
  const {
    errors,
    formState: { touched },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name,
  });

  useEffect(() => {
    if (fields.length < 1) {
      append({ _: '' });
    }
  }, [append, fields]);

  return (
    <ul className={styles.conditionEntries}>
      {fields.map((field, index) => {
        const conditionName = `${name}[${index}]`;
        return (
          <li key={field.id}>
            <ConditionEntry
              name={conditionName}
              error={touched[conditionName] && errors[conditionName]}
            />
            <IconButton
              className={
                fields.length > 1 ? styles.removeFilter : styles.hidden
              }
              icon="delete"
              label="Remove filter"
              type="button"
              onClick={() => remove(index)}
            />
          </li>
        );
      })}
      <Button type="button" icon="add" onClick={() => append({ _: '' })}>
        Add value
      </Button>
    </ul>
  );
};
