/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *

interface TaskDoc {
  path: string;
  object: { [key: string]: any };
}

interface TaskInfo {
  docs: TaskDoc[];
}

export const stressTestRunner = functions.firestore
  .document("stress_test_queue/{taskId}")
  .onCreate(async (snap, context) => {
    const db = snap.ref.firestore;
    let done = false;
    while (!done) {
      done = await db.runTransaction(async (t) => {
        const task = await t.get(snap.ref);
        if (!task.exists) return true;
        const taskInfo = <TaskInfo>task.data();
        const doc = taskInfo.docs.pop();
        if (doc) t.set(db.doc(doc.path), doc.object);
        if (taskInfo.docs.length > 0) {
          t.set(snap.ref, taskInfo);
          return false;
        } else {
          t.delete(snap.ref);
          return true;
        }
      });
    }
  });
