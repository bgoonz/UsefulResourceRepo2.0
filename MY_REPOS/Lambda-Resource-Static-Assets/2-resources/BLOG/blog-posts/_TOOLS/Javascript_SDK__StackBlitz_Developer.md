# Javascript SDK | StackBlitz Developer

> Wouldn't it be great if you could create & embed StackBlitz projects on-demand in your docs, examples, blog posts... in just a couple lines of code?

Wouldn't it be great if you could create & embed StackBlitz projects on-demand in your docs, examples, blog posts... in just a couple lines of code?

This is exactly what our Javascript SDK allows you to do. Even better, the SDK even gives you full control of the StackBlitz VM- allowing you to build rich & interactive experiences around your projects.

The SDK is **2kb gzipped** (!) and you can install it from NPM:

npm install --save @stackblitz/sdk

Or add a script tag to the UMD build on jsDelivr/Unpkg — the SDK will be available on window as `StackBlitzSDK`:

<script src\="https://unpkg.com/@stackblitz/sdk/bundles/sdk.umd.js"\></script\>

Generate and Embed New Projects
-------------------------------

Creating custom projects on-demand from any data source is super simple with the SDK. There are two methods for doing this:

*   [`openProject`](#sdk-openproject-project-opts) to create a new project & open it in a new tab (or current window).
*   [`embedProject`](#sdk-embedproject-elementorid-project-embedopts) to create a new project & embed it on the current page.

**[View live demo on StackBlitz.](https://stackblitz.com/edit/sdk-create-project)**

### sdk.openProject(project\[, opts\])

Create a new project and open it in a new tab (or in the current window).

#### Project payload

{

files: {\[path: string\]: string};

title: string;

description: string;

template: 'angular-cli' | 'create-react-app' | 'typescript' | 'javascript';

tags?: string\[\];

dependencies?: {\[name: string\]: string};

settings?: {

compile?: {

trigger?: 'auto' | 'keystroke' | 'save';

action?: 'hmr' | 'refresh';

clearConsole?: boolean;

};

};

}

#### Options

{

openFile?: string;

newWindow?: true

hideDevTools?: boolean;

devToolsHeight?: number;

initialPath?: string;

origin?: string;

}

#### Required files for templates

<table><tbody><tr><td></td><td>Requires <b>index.html</b> and <b>main.ts</b> to be present</td></tr><tr><td></td><td>Requires <b>index.html</b> and <b>index.js</b> to be present</td></tr><tr><td></td><td>Requires <b>index.html</b> and <b>index.ts</b> to be present</td></tr><tr><td></td><td>Requires <b>index.html</b> and <b>index.js</b> to be present</td></tr></tbody></table>

### sdk.embedProject(elementOrId, project\[, embedOpts\])

Create a new project and embed it on the current page. Returns a promise resolving it's [VM instance](#controlling-the-vm).

`elementOrId`: Either an element's ID string or the target HTMLElement itself.

`project`: The same [project payload](#project-payload) as the `openProject` method.

`embedOpts`: Optional argument that allows you to implement various embed controls:

#### Embed options

{

openFile?: string;

clickToLoad?: boolean;

view?: 'preview' | 'editor';

height?: number | string;

width?: number | string;

hideExplorer?: boolean;

hideNavigation?: boolean;

forceEmbedLayout?: boolean;

initialPath?: string;

origin?: string;

}

Open and Embed Github Repos
---------------------------

Yup, you can point directly at Github repos containing Angular/React projects and it'll automatically pull them down & run them.

**[View live demo on StackBlitz.](https://stackblitz.com/edit/sdk-github-project)**

### sdk.openGithubProject(repoSlug\[, opts\])

Open a project from Github and open it in a new tab (or in the current window).

`repoSlug`: String of the Github username, repo and optionally branch/tag/commit.

`opts`: The same [options object](#options) as `openProject`

### sdk.embedGithubProject(elementOrId, repoSlug\[, embedOpts\])

Embeds a project from Github on the current page. Returns a promise resolving it's [VM instance](#controlling-the-vm).

`elementOrId`: Either an element ID string or the target HTMLElement itself.

`repoSlug`: String of the Github username, repo and optionally branch/tag/commit.

`embedOpts`: Optional [embed options](#embed-options) object

Open and Embed StackBlitz Projects
----------------------------------

If you have a specific StackBlitz project ID you want to open or embed, you can use these methods:

### sdk.openProjectId(projectId\[, opts\])

Open an existing StackBlitz project in a new tab (or in the current window).

`projectId`: The ID of the StackBlitz project to open

`opts`: The same [options object](#options) as `openProject`

### sdk.embedProjectId(elementOrId, projectId\[, embedOpts\])

Embeds an existing StackBlitz project on the current page. Returns a promise resolving it's [VM instance](#controlling-the-vm).

`elementOrId`: Either an element ID string or the target HTMLElement itself.

`projectId`: The ID of the StackBlitz project to open

`embedOpts`: Optional [embed options](#embed-options) object

Controlling the VM
------------------

All of the embed methods on the SDK automatically connect to the embedded StackBlitz VM and return a promise containing an initialized `VM` class. This allows you to have programmatic access of the file system, package manager, editor, and more.

> **Note:** The VM API's are currently under active development—we'd love to [hear your feedback](https://discord.gg/stackblitz).

**[View live demo on StackBlitz.](https://stackblitz.com/edit/sdk-vm)**

### vm.applyFsDiff(diff)

Apply batch updates to the FS in one call. Returns a promise.

`diff`: A [diff object](#diff-object) containing files to create and delete.

#### DIFF OBJECT

{

create: {

\[path: string\]: string

},

destroy: string\[\]

}

### vm.getFsSnapshot()

Get a snapshot of the entire FS. Returns a promise resolving the file system object.

### vm.editor.openFile(path)

Open a file in the editor that exists in the current FS. Returns a promise.

`path`: String of entire file path (i.e. 'somefolder/index.js')

### vm.preview.origin

String. The URL of the preview domain that the user can open in new tab(s) as they use the embed. Every project created with the `embedProject` method gets its own unique preview URL.

### vm.getDependencies()

Returns a promise resolving an object containing the currently installed dependencies with corresponding version numbers.


[Source](https://developer.stackblitz.com/docs/platform/javascript-sdk)