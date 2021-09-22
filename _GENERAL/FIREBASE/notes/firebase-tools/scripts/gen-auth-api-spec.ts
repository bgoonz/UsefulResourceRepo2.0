/**
 * gen-auth-api-specs generates the OpenAPI v3 specification file for the Auth
 * Emulator `../src/emulator/auth/apiSpec.js` by converting and combining
 * production Google API Discovery documents for all services it emulates.
 *
 * The resulting file can be used with OpenAPI tooling, such as exegesis, a
 * library that does validation and route wiring for the Auth Emulator.
 *
 * It also writes a `schema.ts` file in the same directory for type-checking.
 */

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-ts-comment */

import * as https from "https";
import { resolve } from "path";
import { writeFileSync } from "fs";
// @ts-ignore
import * as prettier from "prettier";
// @ts-ignore
import * as swagger2openapi from "swagger2openapi";
// @ts-ignore
import { merge, isErrorResult } from "openapi-merge";
import swaggerToTS from "@manifoldco/swagger-to-ts";

// Convert Google API Discovery format to OpenAPI using this library in order
// to use OpenAPI tooling, recommended by https://googleapis.github.io/#openapi.
// The coverter is not perfect and requires some specific hacks shown below.
// @ts-ignore
import * as googleDiscoveryToSwagger from "google-discovery-to-swagger";

// Swagger and OpenAPI 3.0 formats do not support RFC 6570 Level 2 features
// (like {+var}) which are present in API Discovery. Setting this flag in this
// library makes it produce Level 1-only URL templates and fully spec-compliant.
googleDiscoveryToSwagger.setStrict(true);

async function main(): Promise<void> {
  const [v1Disc, v2Disc, tokenDisc] = await Promise.all([
    fetchJson("https://identitytoolkit.googleapis.com/$discovery/rest?version=v1"),
    fetchJson("https://identitytoolkit.googleapis.com/$discovery/rest?version=v2"),
    fetchJson("https://securetoken.googleapis.com/$discovery/rest?version=v1"),
  ]);

  // This method is not supported in the emulator and its response is untyped,
  // which confuses the converter. Let's just drop it.
  delete v1Disc.resources.v1.methods.getPublicKeys;

  const tokenOas = await toOpenapi3(tokenDisc);
  pushServersDownToEachPath(tokenOas);

  // Re-tag secureToken APIs with "secureToken" so they are nicely separated.
  tokenOas.tags = [{ name: "secureToken" }];
  forEachOperation(tokenOas, (op) => {
    op.tags = ["secureToken"];
    // Also support URL-encoded to conform with the OAuth 2.0 specification.
    op.requestBody.content["application/x-www-form-urlencoded"] =
      op.requestBody.content["application/json"];
  });

  const merged = merge([
    { oas: await toOpenapi3(v1Disc) },
    { oas: await toOpenapi3(v2Disc) },
    { oas: tokenOas },
  ]);
  if (isErrorResult(merged)) {
    throw new Error(`Failed to merge APIs: ${merged.type}: ${merged.message}`);
  }

  addEmulatorOperations(merged.output);

  const header =
    "/* DO NOT EDIT! This file is automatically generated by scripts/gen-auth-api-spec.ts. */\n" +
    "/* See README.md (Section: Autogenerated files) for how to read / review this file. */\n" +
    "/* eslint-disable */\n\n";
  const specContent = header + "export default " + JSON.stringify(merged.output);
  const specFile = resolve(__dirname, "../src/emulator/auth/apiSpec.js");
  const prettierOptions = await prettier.resolveConfig(specFile);
  writeFileSync(specFile, prettier.format(specContent, { ...prettierOptions, filepath: specFile }));

  // Also generate TypeScript definitions for use in implementation.
  const prettierConfig = resolve(__dirname, "../.prettierrc");
  const defsContent = header + swaggerToTS(merged.output as any, { prettierConfig });
  writeFileSync(resolve(__dirname, "../src/emulator/auth/schema.ts"), defsContent);
}

function fetchJson(url: string): any {
  return new Promise<string>((resolve, reject) => {
    let json = "";
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} received.`));
        }
        res.on("data", (d) => {
          json += d;
        });
        res.on("end", () => {
          resolve(json);
        });
      })
      .on("error", reject);
  }).then((json) => {
    return sortKeys(JSON.parse(json));
  });
}

const OPENAPI_HTTP_METHODS = ["get", "put", "post", "delete", "options", "head", "patch", "trace"];

async function toOpenapi3(discovery: any): Promise<any> {
  // Error format query param, not supported in emulator and pollutes defs.
  delete discovery.parameters["$.xgafv"];

  // This will be covered as an additional security scheme below.
  const apiKeyDescription = discovery.parameters.key.description;
  delete discovery.parameters.key;

  // We first convert the discovery document to Swagger (a.k.a. OpenAPI 2.0) and
  // then to OpenAPI 3.0 because there is tool that does direct conversion. Some
  // tools offer one single API call for the entire conversion, but perform
  // indirect conversion under the hood. We'll just do it explicitly and that
  // also gives us more control (such as .setStrict above) and less deps.
  const swagger = await googleDiscoveryToSwagger.convert(discovery);
  const result = await swagger2openapi.convertObj(swagger, {});
  const openapi3 = result.openapi;
  openapi3.servers.forEach((server: { url: string }) => {
    // Server URL should not end with slash since it is prefixed to paths.
    server.url = server.url.replace(/\/$/, "");
  });
  patchSecurity(openapi3, apiKeyDescription);

  return openapi3;
}

function patchSecurity(openapi3: any, apiKeyDescription: string): void {
  // OpenAPI v3 now supports putting multiple flows in one single OAuth object,
  // so let's remove the "Oauth2c" workaround and merge it into "Oauth2".
  let securitySchemes = openapi3.components.securitySchemes;
  if (securitySchemes) {
    Object.assign(securitySchemes.Oauth2.flows, securitySchemes.Oauth2c.flows);
    delete securitySchemes.Oauth2c;
  } else {
    securitySchemes = openapi3.components.securitySchemes = {};
  }

  // Add the missing apiKey method here.
  securitySchemes.apiKey = {
    type: "apiKey",
    name: "key",
    in: "query",
    description: apiKeyDescription,
  };

  forEachOperation(openapi3, (operation) => {
    if (!operation.security) {
      operation.security = [];
    }
    operation.security.forEach((alt: { Oauth2c?: unknown }) => {
      // google-discovery-to-swagger puts both Oauth2 and Oauth2c in the
      // same object, wrongly implying BOTH are required at the same time.
      // Luckily, we have unified them above so let's remove the extra one.
      delete alt.Oauth2c;
    });

    // Forcibly add API Key as an alternative auth method. Note that some
    // operations may not support it, but those can be handled within impl.
    operation.security.push({ apiKey: [] });
  });
}

function forEachOperation(openapi3: any, callback: (operation: any) => void): void {
  Object.keys(openapi3.paths).forEach((path) => {
    if (!path.startsWith("/")) {
      return;
    }
    OPENAPI_HTTP_METHODS.forEach((method) => {
      const operation = openapi3.paths[path][method];
      if (operation) {
        callback(operation);
      }
    });
  });
}

/**
 * Pushes the global "servers" setting down to each path in the spec.
 *
 * This is needed for API specs that has a different server than the main one
 * (e.g. securetokens.googleapis.com) so its server is preserved after merge.
 *
 * @param openapi3 the API spec to patch.
 */
function pushServersDownToEachPath(openapi3: any): void {
  Object.keys(openapi3.paths).forEach((path) => {
    if (!path.startsWith("/")) return;
    openapi3.paths[path].servers = openapi3.servers;
  });
}

function addEmulatorOperations(openapi3: any): void {
  openapi3.tags.push({ name: "emulator" });
  openapi3.paths["/emulator/v1/projects/{targetProjectId}/accounts"] = {
    parameters: [
      {
        name: "targetProjectId",
        in: "path",
        description: "The ID of the Google Cloud project that the accounts belong to.",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    servers: [{ url: "" }],
    delete: {
      description: "Remove all accounts in the project, regardless of state.",
      operationId: "emulator.projects.accounts.delete",
      responses: {
        "200": {
          description: "Successful response",
          content: {
            "application/json": {
              schema: {
                type: "object",
              },
            },
          },
        },
      },
      security: [],
      tags: ["emulator"],
    },
  };
  openapi3.paths["/emulator/v1/projects/{targetProjectId}/config"] = {
    parameters: [
      {
        name: "targetProjectId",
        in: "path",
        description: "The ID of the Google Cloud project that the config belongs to.",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    servers: [{ url: "" }],
    get: {
      description: "Get emulator-specific configuration for the project.",
      operationId: "emulator.projects.config.get",
      responses: {
        "200": {
          description: "Successful response",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/EmulatorV1ProjectsConfig",
              },
            },
          },
        },
      },
      security: [],
      tags: ["emulator"],
    },
    patch: {
      description: "Update emulator-specific configuration for the project.",
      operationId: "emulator.projects.config.update",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/EmulatorV1ProjectsConfig",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Successful response",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/EmulatorV1ProjectsConfig",
              },
            },
          },
        },
      },
      security: [],
      tags: ["emulator"],
    },
  };
  openapi3.components.schemas.EmulatorV1ProjectsConfig = {
    type: "object",
    description: "Emulator-specific configuration.",
    properties: {
      signIn: {
        properties: {
          allowDuplicateEmails: { type: "boolean" },
        },
        type: "object",
      },
    },
  };
  openapi3.paths["/emulator/v1/projects/{targetProjectId}/oobCodes"] = {
    parameters: [
      {
        name: "targetProjectId",
        in: "path",
        description: "The ID of the Google Cloud project that the confirmation codes belongs to.",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    servers: [{ url: "" }],
    get: {
      description: "List all pending confirmation codes for the project.",
      operationId: "emulator.projects.oobCodes.list",
      responses: {
        "200": {
          description: "Successful response",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/EmulatorV1ProjectsOobCodes",
              },
            },
          },
        },
      },
      security: [],
      tags: ["emulator"],
    },
  };
  openapi3.components.schemas.EmulatorV1ProjectsOobCodes = {
    type: "object",
    description: "Details of all pending confirmation codes.",
    properties: {
      oobCodes: {
        type: "array",
        items: {
          type: "object",
          properties: {
            email: { type: "string" },
            oobCode: { type: "string" },
            oobLink: { type: "string" },
            requestType: { type: "string" },
          },
        },
      },
    },
  };
  openapi3.paths["/emulator/v1/projects/{targetProjectId}/verificationCodes"] = {
    parameters: [
      {
        name: "targetProjectId",
        in: "path",
        description: "The ID of the Google Cloud project that the verification codes belongs to.",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    servers: [{ url: "" }],
    get: {
      description: "List all pending phone verification codes for the project.",
      operationId: "emulator.projects.verificationCodes.list",
      responses: {
        "200": {
          description: "Successful response",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/EmulatorV1ProjectsOobCodes",
              },
            },
          },
        },
      },
      security: [],
      tags: ["emulator"],
    },
  };
  openapi3.components.schemas.EmulatorV1ProjectsVerificationCodes = {
    type: "object",
    description: "Details of all pending verification codes.",
    properties: {
      verificationCodes: {
        type: "array",
        items: {
          type: "object",
          properties: {
            code: { type: "string" },
            phoneNumber: { type: "string" },
            sessionInfo: { type: "string" },
          },
        },
      },
    },
  };
}

// The JSONs returned by APIs above keep the same structure unless there is a
// change to the APIs. However, the JSON key order may change with each call.
// Let's sort the keys to make this script produce deterministic output.
function sortKeys<T>(obj: T): T {
  if (obj == null || typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(sortKeys) as unknown as T;
  }
  const sortedObj: T = {} as T;
  (Object.keys(obj) as [keyof T]).sort().forEach((key) => {
    sortedObj[key] = sortKeys(obj[key]);
  });
  return sortedObj;
}

if (module.parent === null) {
  main();
}
