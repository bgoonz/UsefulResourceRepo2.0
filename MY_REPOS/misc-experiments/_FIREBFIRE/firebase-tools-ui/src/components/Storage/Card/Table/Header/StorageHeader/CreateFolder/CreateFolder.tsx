/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
react';

import { useStorageFiles } from '../../../../../api/useStorageFiles';
import { CreateFolderDialog } from './CreateFolderDialog/CreateFolderDialog';

export const CreateFolder: React.FC = () => {
  const { createFolder } = useStorageFiles();
  const [shouldShowDialog, setShouldShowDialog] = useState(false);

  return (
    <>
      <IconButton
        icon="create_new_folder"
        theme="secondary"
        aria-label="Create new folder"
        title="Create new folder"
        onClick={() => setShouldShowDialog(true)}
      />

      {shouldShowDialog && (
        <CreateFolderDialog
          isOpen={shouldShowDialog}
          close={() => setShouldShowDialog(false)}
          confirm={(name: string) => createFolder(name)}
        />
      )}
    </>
  );
};
