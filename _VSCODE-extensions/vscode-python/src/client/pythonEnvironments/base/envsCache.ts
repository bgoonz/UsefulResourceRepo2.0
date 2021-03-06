// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { cloneDeep } from 'lodash';
import { PythonEnvInfo } from './info';
import { areSameEnv } from './info/env';

/**
 * Represents the environment info cache to be used by the cache locator.
 */
export interface IEnvsCache {
    /**
     * Initialization logic to be done outside of the constructor, for example reading from persistent storage.
     */
    initialize(): Promise<void>;

    /**
     * Return all environment info currently in memory for this session.
     *
     * @return An array of cached environment info, or `undefined` if there are none.
     */
    getAllEnvs(): PythonEnvInfo[] | undefined;

    /**
     * Replace all environment info currently in memory for this session.
     *
     * @param envs The array of environment info to store in the in-memory cache.
     */
    setAllEnvs(envs: PythonEnvInfo[]): void;

    /**
     * If the cache has been initialized, return environment info objects that match a query object.
     * If none of the environments in the cache match the query data, return an empty array.
     * If the in-memory cache has not been initialized prior to calling `filterEnvs`, return `undefined`.
     *
     * @param env The environment info data that will be used to look for
     * environment info objects in the cache, or a unique environment key.
     * If passing an environment info object, it may contain incomplete environment info.
     * @return The environment info objects matching the `env` param,
     * or `undefined` if the in-memory cache is not initialized.
     */
    filterEnvs(query: Partial<PythonEnvInfo>): PythonEnvInfo[] | undefined;

    /**
     * Writes the content of the in-memory cache to persistent storage.
     */
    flush(): Promise<void>;
}

export interface IPersistentStorage {
    load(): Promise<PythonEnvInfo[] | undefined>;
    store(envs: PythonEnvInfo[]): Promise<void>;
}

type CompleteEnvInfoFunction = (envInfo: PythonEnvInfo) => boolean;

/**
 * Environment info cache using persistent storage to save and retrieve pre-cached env info.
 */
export class PythonEnvInfoCache implements IEnvsCache {
    private initialized = false;

    private envsList: PythonEnvInfo[] | undefined;

    private persistentStorage: IPersistentStorage | undefined;

    constructor(
        private readonly isComplete: CompleteEnvInfoFunction,
        private readonly getPersistentStorage?: () => IPersistentStorage
    ) {}

    public async initialize(): Promise<void> {
        if (this.initialized) {
            return;
        }

        this.initialized = true;
        if (this.getPersistentStorage !== undefined) {
            this.persistentStorage = this.getPersistentStorage();
            this.envsList = await this.persistentStorage.load();
        }
    }

    public getAllEnvs(): PythonEnvInfo[] | undefined {
        return cloneDeep(this.envsList);
    }

    public setAllEnvs(envs: PythonEnvInfo[]): void {
        this.envsList = cloneDeep(envs);
    }

    public filterEnvs(query: Partial<PythonEnvInfo>): PythonEnvInfo[] | undefined {
        if (this.envsList === undefined) {
            return undefined;
        }
        const result = this.envsList.filter((info) => areSameEnv(info, query));
        return cloneDeep(result);
    }

    public async flush(): Promise<void> {
        const completeEnvs = this.envsList?.filter(this.isComplete);

        if (completeEnvs?.length) {
            await this.persistentStorage?.store(completeEnvs);
        }
    }
}
