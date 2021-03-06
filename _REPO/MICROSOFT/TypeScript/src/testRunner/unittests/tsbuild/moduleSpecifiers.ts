namespace ts {
    // https://github.com/microsoft/TypeScript/issues/31696
    describe("unittests:: tsbuild:: moduleSpecifiers:: synthesized module specifiers to referenced projects resolve correctly", () => {
        verifyTsc({
            scenario: "moduleSpecifiers",
            subScenario: `synthesized module specifiers resolve correctly`,
            fs: () => loadProjectFromFiles({
                "/src/solution/common/nominal.ts": Utils.dedent`
                    export declare type Nominal<T, Name extends string> = T & {
                        [Symbol.species]: Name;
                    };
                    `,
                "/src/solution/common/tsconfig.json": Utils.dedent`
                    {
                        "extends": "../../tsconfig.base.json",
                        "compilerOptions": {
                            "composite": true
                        },
                        "include": ["nominal.ts"]
                    }`,
                "/src/solution/sub-project/index.ts": Utils.dedent`
                    import { Nominal } from '../common/nominal';

                    export type MyNominal = Nominal<string, 'MyNominal'>;
                    `,
                "/src/solution/sub-project/tsconfig.json": Utils.dedent`
                    {
                        "extends": "../../tsconfig.base.json",
                        "compilerOptions": {
                            "composite": true
                        },
                        "references": [
                            { "path": "../common" }
                        ],
                        "include": ["./index.ts"]
                    }`,
                "/src/solution/sub-project-2/index.ts": Utils.dedent`
                    import { MyNominal } from '../sub-project/index';

                    const variable = {
                        key: 'value' as MyNominal,
                    };

                    export function getVar(): keyof typeof variable {
                        return 'key';
                    }
                    `,
                "/src/solution/sub-project-2/tsconfig.json": Utils.dedent`
                    {
                        "extends": "../../tsconfig.base.json",
                        "compilerOptions": {
                            "composite": true
                        },
                        "references": [
                            { "path": "../sub-project" }
                        ],
                        "include": ["./index.ts"]
                    }`,
                "/src/solution/tsconfig.json": Utils.dedent`
                    {
                        "compilerOptions": {
                            "composite": true
                        },
                        "references": [
                            { "path": "./sub-project" },
                            { "path": "./sub-project-2" }
                        ],
                        "include": []
                    }`,
                "/src/tsconfig.base.json": Utils.dedent`
                    {
                        "compilerOptions": {
                            "skipLibCheck": true,
                            "rootDir": "./",
                            "outDir": "lib",
                        }
                    }`,
                "/src/tsconfig.json": Utils.dedent`{
                    "compilerOptions": {
                        "composite": true
                    },
                    "references": [
                        { "path": "./solution" }
                    ],
                    "include": []
                }`
            }, symbolLibContent),
            commandLineArgs: ["-b", "/src", "--verbose"]
        });
    });
}
