/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *


import { useMultiselect } from '../../common/useMultiselect';
import { renderWithStorage } from '../../testing/renderWithStorage';
import { StorageTable } from './Table';

describe('Table', () => {
  const fileName = 'pirojok.txt';
  const file2 = 'hello.png';
  const file3 = 'dog.jpg';

  async function setup() {
    const selectFile = jest.fn();
    const FakeComponent: React.FC = () => {
      const selection = useMultiselect([fileName, file2, file3]);
      return (
        <StorageTable
          selection={selection}
          selectFile={selectFile}
          selectedFile={{}}
        />
      );
    };
    return renderWithStorage(<FakeComponent />);
  }

  it('displays zero state when there are no files', async () => {
    const { getAllByRole, getByText } = await setup();
    const rows = getAllByRole('row');

    // Only header how
    expect(rows.length).toBe(1);

    expect(getByText('No files found')).toBeDefined();
  });

  it('display all the rows', async () => {
    const { getAllByRole, getByText, queryByText, uploadFile } = await setup();

    await uploadFile(fileName);
    await uploadFile('lol.txt', 'folder');

    expect(getByText(fileName)).toBeDefined();
    const rows = getAllByRole('row');
    expect(rows.length).toBe(3);

    expect(queryByText('No files found')).toBe(null);
  });

  describe('selection', () => {
    it('displays appropriate checkbox values', async () => {
      const { getByLabelText, uploadFile } = await setup();

      await uploadFile(fileName);
      await uploadFile(file2);
      await uploadFile(file3);

      const selectAll = getByLabelText('Select all') as HTMLInputElement;

      expect(selectAll.checked).toBe(false);
      expect(selectAll.indeterminate).toBe(false);

      await act(async () => {
        await getByLabelText(fileName).click();
      });

      expect(selectAll.checked).toBe(false);
      expect(selectAll.indeterminate).toBe(true);

      await act(async () => {
        await getByLabelText(file2).click();
        await getByLabelText(file3).click();
      });

      expect(selectAll.checked).toBe(true);
      expect(selectAll.indeterminate).toBe(false);

      await act(async () => {
        await getByLabelText(file3).click();
      });

      expect(selectAll.checked).toBe(false);
      expect(selectAll.indeterminate).toBe(true);

      await act(async () => {
        await selectAll.click();
      });

      expect(selectAll.checked).toBe(true);
      expect(selectAll.indeterminate).toBe(false);
    });
  });
});
