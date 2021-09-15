/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *

// Helper types for Sinon stubs and spies.

export type Stub<T extends (...args: any) => any> = SinonStub<
  Parameters<T>,
  ReturnType<T>
>;

export type Spy<T extends (...args: any) => any> = SinonSpy<
  Parameters<T>,
  ReturnType<T>
>;
