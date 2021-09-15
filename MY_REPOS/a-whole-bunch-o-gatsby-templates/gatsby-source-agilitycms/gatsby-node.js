let path = require("path");

let {
  logDebug,
  logInfo,
  logError,
  logWarning,
  logSuccess,
  asyncForEach,
} = require("./util");
let agilitySync = require("@agility/content-sync");
let syncInterfaceGatsby = require("./sync-interface-gatsby");

//SOURCE NODES ***********************************************************************************************
exports.sourceNodes = async (args, configOptions) => {
  const {
    actions,
    createNodeId,
    createContentDigest,
    getNode,
    getNodes,
    store,
    cache,
    reporter,
  } = args;
  const { createNode, deleteNode, deletePage, touchNode } = actions;

  const languages = configOptions.languages;
  const languageCodes = resolveLanguageCodes(configOptions.languages);
  const channelsRefs = resolveChannelRefNames(configOptions.channels);

  const isMultiLanguage = languageCodes.length > 1;

  if (
    configOptions.guid === undefined ||
    configOptions.guid === null ||
    configOptions.guid === ""
  ) {
    logWarning(
      `You haven't setup your GUID and API Key Environment Variables yet.`
    );
    logWarning(
      "You may want to check out this link from the Agility Docs: https://help.agilitycms.com/hc/en-us/articles/360039879872"
    );
    return;
  }

  //set up our Agility CMS Sync Client
  const syncClient = agilitySync.getSyncClient({
    guid: configOptions.guid,
    apiKey: configOptions.apiKey,
    isPreview: configOptions.isPreview,
    debug: configOptions.debug,
    baseUrl: configOptions.baseUrl,
    channels: channelsRefs,
    languages: languageCodes,
    store: {
      //use gatsby sync interface
      interface: syncInterfaceGatsby,
      options: {
        getNode,
        createNodeId,
        createNode,
        createContentDigest,
        deleteNode,
      },
    },
  });

  logInfo(`Source Nodes Started (${process.env.NODE_ENV})...`);

  //touch the nodes so that the ones we don't update stay persistent
  await touchAllNodes({ getNodes, touchNode });

  //start the sync, check what has changed and refresh source nodes
  await syncClient.runSync();

  logInfo(`Creating sitemap nodes...`);

  //TODO: Do we need to do this every time?
  await createSitemapSourceNodes({
    createNode,
    createNodeId,
    createContentDigest,
    channelsRefs,
    languages,
    syncClient,
    isMultiLanguage,
  });

  logInfo(`Source Nodes Completed.`);
};

//CREATE PAGES ***********************************************************************************************
exports.createPages = async (args, configOptions) => {
  const {
    graphql,
    actions,
    getNode,
    createNodeId,
    createContentDigest,
    store,
  } = args;
  const {
    createPage,
    deletePage,
    createNode,
    createRedirect,
    createPageDependency,
  } = actions;

  const languages = configOptions.languages;
  const channelsRefs = resolveChannelRefNames(configOptions.channels);
  const debug = configOptions.debug;
  const isMultiLanguage = languages.length > 1;
  const defaultLanguage = languages[0];

  logInfo(`Create Pages Started...`);

  let isPreview = configOptions.isPreview;
  let pageTemplate = null;

  if (configOptions.masterPageTemplate) {
    pageTemplate = path.resolve(configOptions.masterPageTemplate);
  }

  if (
    configOptions.guid === undefined ||
    configOptions.guid === null ||
    configOptions.guid === ""
  ) {
    //We already gave the user warning up top, just don't proceed if we don't have a guid

    return;
  }

  //set up our Agility CMS Sync Client
  const syncClient = agilitySync.getSyncClient({
    guid: configOptions.guid,
    apiKey: configOptions.apiKey,
    isPreview: configOptions.isPreview,
    debug: configOptions.debug,
    baseUrl: configOptions.baseUrl,
    channels: configOptions.channels,
    languages: configOptions.languages,
    store: {
      //use gatsby sync interface
      interface: syncInterfaceGatsby,
      options: {
        getNode,
        createNodeId,
        createNode,
        createContentDigest,
      },
    },
  });

  await createPagesInEachLanguage({
    syncClient,
    languages,
    channelsRefs,
    createPage,
    createRedirect,
    pageTemplate,
    isPreview,
    debug,
    isMultiLanguage,
    defaultLanguage,
  });

  //HACK: create a dummy page for `gatsby develop` redirects on the client-side for dynamic preview urls
  await createClientRedirectPageForPreviewNode({ createPage });

  //create url redirections
  await createRedirects({ syncClient, createRedirect, languages });
};

//CREATE RESOLVERS *******************************************************************************************
exports.createResolvers = (args) => {
  const {
    createResolvers,
    getNode,
    createNodeId,
    createNode,
    createContentDigest,
  } = args;

  const getContentItem = async ({
    contentID,
    languageCode,
    context,
    depth,
  }) => {
    const preStr = `agility${languageCode}-item-${contentID}`.toLowerCase();
    const nodeIDStr = createNodeId(preStr);

    const gItem = context.nodeModel.getNodeById({
      id: nodeIDStr,
      type: "agilityitem",
    });

    if (!gItem) return null;

    const itemJson = gItem.internal.content;
    const contentItem = JSON.parse(itemJson);

    //expand the item if we have to...
    if (depth > 0) {
      for (const fieldName in contentItem.customFields) {
        const fieldValue = contentItem.customFields[fieldName];
        if (!fieldValue) continue;
        if (fieldValue.contentid > 0) {
          //single linked item
          const childItem = await getContentItem({
            contentID: fieldValue.contentid,
            languageCode,
            context,
            depth: depth - 1,
          });
          if (childItem != null)
            contentItem.customFields[fieldName] = childItem;
        } else if (fieldValue.sortids && fieldValue.sortids.split) {
          //multi linked item
          const sortIDAry = fieldValue.sortids.split(",");
          const childItems = [];
          for (const childItemID of sortIDAry) {
            const childItem = await getContentItem({
              contentID: childItemID,
              languageCode,
              context,
              depth: depth - 1,
            });
            if (childItem != null) childItems.push(childItem);
          }

          contentItem.customFields[fieldName] = childItems;
        }
      }
    }

    return contentItem;
  };

  const resolvers = {
    agilitypage: {
      pageJson: {
        resolve: async (source, args, context, info) => {
          const languageCode = source.languageCode;

          const pageJSON = source.internal.content;
          const pageItem = JSON.parse(pageJSON);
          let depth = 3;

          for (const zoneName in pageItem.zones) {
            const zone = pageItem.zones[zoneName];

            for (const mod of zone) {
              const moduleItem = await getContentItem({
                contentID: mod.item.contentid,
                languageCode,
                context,
                depth: depth - 1,
              });
              mod.item = moduleItem;
            }
          }

          return JSON.stringify(pageItem);
        },
      },
    },
    agilityitem: {
      itemJson: {
        resolve: async (source, args, context, info) => {
          const languageCode = source.languageCode;
          const contentID = source.itemID;

          const itemExpanded = await getContentItem({
            contentID,
            languageCode,
            context,
            depth: 3,
          });

          return JSON.stringify(itemExpanded);
        },
      },
    },
  };
  createResolvers(resolvers);
};

//SETUP WEBPACK CONFIG
exports.onCreateWebpackConfig = ({ actions }) => {

	actions.setWebpackConfig({
      resolve: {
         fallback: {
           fs: false,
		   path: false,
		   zlib: false,
		   tty: false,
		   constants: false,
		   events: false,
		   url: false,
		   assert: false,
		   stream: false,
		   http: false,
		   https: false,
		   os: false,

         }
      }
	})
  }

const createSitemapSourceNodes = async ({
  createNode,
  createNodeId,
  createContentDigest,
  channelsRefs,
  languages,
  syncClient,
  isMultiLanguage,
}) => {
  //only support one channel for now (first channel)
  let channelName = channelsRefs[0];

  await asyncForEach(languages, async (lang) => {
    const languageCode = lang.code;

    //get the sitemap from the local store
    let sitemap = await syncClient.store.getSitemap({
      channelName,
      languageCode,
    });

    if (!sitemap) {
      throw new Error(
        `Could not get the sitemap node(s) for channel ${channelName} in language ${languageCode}`
      );
    }

    //create the sitemap nodes...
    for (const pagePath in sitemap) {
      const sitemapNode = sitemap[pagePath];

      // if no contentID, set to -1
      if (sitemapNode.contentID == null) {
        sitemapNode.contentID = -1;
      }

      sitemapNode.path = resolvePagePath(pagePath, lang, isMultiLanguage);
      sitemapNode.pagePath = resolvePagePath(pagePath, lang, isMultiLanguage);

      const nodeID = createNodeId(
        `sitemap-${sitemapNode.pageID}-${languageCode}-${sitemapNode.contentID}`
      );

      const nodeMeta = {
        id: nodeID,
        parent: null,
        children: [],
        languageCode: languageCode,
        pagePath: sitemapNode.pagePath,
        internal: {
          type: "agilitySitemapNode",
          content: "",
          contentDigest: createContentDigest(sitemapNode),
        },
      };

      const nodeToCreate = Object.assign({}, sitemapNode, nodeMeta);

      await createNode(nodeToCreate);
    }
  });
};

/**
 * Touch the previous nodes so that they don't get erased in this build
 */
const touchAllNodes = async ({ getNodes, touchNode }) => {
  let nodes = getNodes();
  let count = 0;
  await asyncForEach(nodes, async (node) => {
    //only touch the Agility nodes that are NOT sitemap nodes
    const nodeType = node.internal.type.toLowerCase();
    if (
      nodeType.indexOf("agility") != -1 &&
      nodeType.indexOf("agilitySitemapNode") === -1
    ) {
      await touchNode(node);
      count++;
    }
  });

  logSuccess(`Touched ${count} nodes`);
};

/**
 * Create a page for Gatsby to render based on a sitemap node
 * @param {*} pagePath
 * @param {*} sitemapNode
 * @param {*} isHomePage
 * @returns
 */
const createAgilityPage = async ({
  languages,
  createPage,
  createRedirect,
  pagePath,
  sitemapNode,
  isHomePage,
  pageTemplate,
  languageCode,
  isPreview,
  debug,
  isMultiLanguage,
}) => {
  //create a redirect for a link node...
  if (sitemapNode.redirect && sitemapNode.redirect.url) {
    let redirectUrl = sitemapNode.redirect.url;
    if (redirectUrl.indexOf("~/") == 0) redirectUrl = redirectUrl.substring(1);

    await createRedirect({
      fromPath: pagePath,
      toPath: redirectUrl,
      isPermanent: true,
      redirectInBrowser: true,
    });

    return;
  }

  //create a regular page
  let createPageArgs = {
    path: pagePath,
    component: pageTemplate,
    context: {
      pageID: sitemapNode.pageID,
      contentID: sitemapNode.contentID || -1,
      languageCode: languageCode,
      title: sitemapNode.title,
      isPreview: isPreview,
      isMultiLanguage: isMultiLanguage,
      languages: languages,
    },
  };

  //tell gatsby to create the page!
  createPage(createPageArgs);

  if (debug) {
    logDebug(JSON.stringify(createPageArgs));
  }
};

//i.e. `{ '12': { ..pageObject } }`
let dynamicPageNodes = {};

//i.e. `{ '/posts/posts-dynamic': { '15':'/posts/some-postitle', '16':'/posts/someother-post'  } }`
let dynamicPagePreviewRedirects = {};

const createServerDynamicPageItemPreviewRedirect = async ({
  createPage,
  sitemapNode,
  createRedirect,
  language,
  syncClient,
  isMultiLanguage,
  debug,
}) => {
  let page = null;

  //if we don't have this dynamic page node yet, get it, and create a dummy page for it (to handle client-side redirects)
  if (!dynamicPageNodes[sitemapNode.pageID]) {
    //get the dynamic page node so we can figure out what the dynamic page's name is
    page = await syncClient.store.getPage({
      pageID: sitemapNode.pageID,
      languageCode: language.code,
    });

    //save this for later
    dynamicPageNodes[sitemapNode.pageID] = page;
  } else {
    //get from memory
    page = dynamicPageNodes[sitemapNode.pageID];
    previewDummyPageCreated = true;
  }

  //i.e. `/posts/some-post-title`
  const pagePath = sitemapNode.path;

  //strip the dynamic formula path -> `/posts`
  let parentPath = pagePath.substring(0, pagePath.lastIndexOf("/"));

  const pagePathFormula = page.dynamic.pageNameFormula;
  //if the formular has / in it (ie: post/category/post-title) pull off the extra slashes

  let slashIndex = pagePathFormula.indexOf("/");
  while (slashIndex !== -1 && parentPath.indexOf("/") !== -1) {
    //loop until we've trimmed out the extra slashes...
    slashIndex = pagePathFormula.indexOf("/", slashIndex + 1);
    parentPath = parentPath.substring(0, parentPath.lastIndexOf("/"));
  }

  //i.e. `posts-dynamic`
  const dynamicNodeSlug = page.name;

  //i.e. `/posts/posts-dynamic`
  const dynamicPageNodePath = `${parentPath}/${dynamicNodeSlug}`;

  //build the preview url -> i.e. `/posts/posts-dynamic?ContentID=12`
  const previewUrl = `${dynamicPageNodePath}?ContentID=${sitemapNode.contentID}&lang=${language.code}`;

  //redirect `/posts/posts-dynamic?ContentID` -> `/posts/some-post-title` or `/en/posts/some-post-title` (if multi-lang)
  const toPath = resolvePagePath(pagePath, language, isMultiLanguage);

  await createRedirect({
    fromPath: previewUrl,
    toPath: toPath,
    isPermanent: false,
    force: true, //for netlify
  });

  if (debug) {
    logDebug(`Preview redirect for ${previewUrl} to ${toPath} created`);
  }

  //HACK: save a list of all our preview redirects so we can create a dummy client-side page to handle each one in `gatsby develop`
  if (!dynamicPagePreviewRedirects[dynamicPageNodePath]) {
    dynamicPagePreviewRedirects[dynamicPageNodePath] = {};
  }

  //i.e. `{ '/posts/posts-dynamic': { '15':'/posts/some-postitle', '16':'/posts/someother-post'  } }`
  dynamicPagePreviewRedirects[dynamicPageNodePath][
    sitemapNode.contentID
  ] = toPath;
};

const createMultiLangRedirect = async ({
  createPage,
  sitemapNode,
  createRedirect,
  language,
  languages,
  syncClient,
  isMultiLanguage,
  debug,
}) => {
  let page = null;

  // https://preview-gsccorporatewebsitemain.gtsb.io/shop?AgilityChannelID=3&lang=en-ca&agilitypreviewkey=K3smxNKVlByfKiRgzZF1dL0My%2boomuPnd6qAH0gwQsjZy8DVulI%2bN%2bimANstHEiuWzl0FiPyI5hlNKLLkQRxOw%3d%3d&agilityts=20201202042751
  // https://preview-gsccorporatewebsitemain.gtsb.io/en-ca/shop

  createPage({
    path: sitemapNode.path,
    component: path.resolve(
      "./src/agility/components/StaticMultiLangPreviewPage.js"
    ),
    context: {
      languages: languages,
    },
  });
};

const resolveChannelRefNames = (channels) => {
  return channels.map((c) => {
    return c.referenceName;
  });
};

const createPagesInEachLanguage = async ({
  syncClient,
  languages,
  channelsRefs,
  createPage,
  createRedirect,
  pageTemplate,
  isPreview,
  debug,
  isMultiLanguage,
  defaultLanguage,
}) => {
  //TODO: handle mulitple channels, just use the first one for now
  let channelName = channelsRefs[0];

  //flag for keeping track of whether we've created a redirect from '/' to our default language
  let mulitLangDefaultRedirectCreated = false;

  //loop through each language
  await asyncForEach(languages, async (language) => {
    //flag for processing the first page in the sitemap for each language
    let isHomePage = true;

    const languageCode = language.code;

    //get the sitemap
    let sitemap = await syncClient.store.getSitemap({
      channelName,
      languageCode,
    });

    if (sitemap == null) {
      logWarning(
        `Could not get the sitemap node(s) for channel ${channelName} in language ${languageCode}`
      );
      return;
    }

    //loop all nodes we returned...
    let pageCount = 0;
    for (let pagePath in sitemap) {
      const sitemapNode = sitemap[pagePath];

      //skip folders
      if (sitemapNode.isFolder) continue;

      //this is the first page in the sitemap
      if (isHomePage) {
        //create a redirect from the first page in the sitemap (i.e. '/home') to the root page of the site ('/' or '/en/' if multi-lang)
        const fromPath = resolvePagePath(
          sitemapNode.path,
          language,
          isMultiLanguage
        );
        const toPath = resolvePagePath("/", language, isMultiLanguage);
        await createRedirect({
          fromPath: fromPath,
          toPath: toPath,
          isPermanent: true,
          redirectInBrowser: true,
        });

        //also need to create the actual '/' or '/en/' root page - if you don't you'll get a 404 on page-data.json requests to '/home'
        await createAgilityPage({
          createPage,
          pagePath: toPath,
          sitemapNode,
          isHomePage,
          pageTemplate,
          languageCode,
          isPreview,
          debug,
          isMultiLanguage,
          languages,
        });

        logInfo(
          `Homepage requests to ${fromPath} will redirect to '${toPath}'`
        );

        //if this is a multi-lang site, also need to setup a redirect from the '/' page to the default language (i.e. '/en/)
        if (isMultiLanguage && !mulitLangDefaultRedirectCreated) {
          const defaultLanguageToPath = resolvePagePath(
            "/",
            defaultLanguage,
            true
          );

          await createRedirect({
            fromPath: "/",
            toPath: resolvePagePath("/", defaultLanguage, true),
            isPermanent: true,
            redirectInBrowser: true,
          });

          //also need to create the actual '/' root page - if you don't you'll get a 404 on page-data.json requests to '/'
          await createAgilityPage({
            createPage,
            pagePath: "/",
            sitemapNode,
            isHomePage,
            pageTemplate,
            languageCode,
            isPreview,
            debug,
            isMultiLanguage,
            languages,
          });

          logInfo(
            `Root requests to '/' will redirect to the default language path '${defaultLanguageToPath}'`
          );

          //flip the flag so we don't reprocess this in other lanaguages
          mulitLangDefaultRedirectCreated = true;
        }
      }

      isHomePage = false; //clear flag, homepage created...
      pagePath = resolvePagePath(pagePath, language, isMultiLanguage);
      await createAgilityPage({
        createPage,
        createRedirect,
        pagePath,
        sitemapNode,
        isHomePage,
        pageTemplate,
        languageCode,
        isPreview,
        debug,
        isMultiLanguage,
        languages,
      });

      //if this is a dynamic page item, create a redirect for preview i.e. `~/posts/posts-dynamic?ContentID=12
      if (sitemapNode.contentID) {
        await createServerDynamicPageItemPreviewRedirect({
          sitemapNode,
          createRedirect,
          createPage,
          language,
          syncClient,
          pageTemplate,
          isMultiLanguage,
          debug,
        });
      }

      if (isMultiLanguage) {
        await createMultiLangRedirect({
          languages,
          sitemapNode,
          createRedirect,
          createPage,
          language,
          syncClient,
          pageTemplate,
          isMultiLanguage,
          debug,
        });
      }

      pageCount++;
    }

    logSuccess(
      `${pageCount} pages created from ${channelName} in ${languageCode}`
    );
  });
};

const createClientRedirectPageForPreviewNode = ({ createPage }) => {
  //HACK - you need to create a dummy client-only page for the redirect to work in gatsby develop...
  //TODO - remove this logic once we have preview link generation working out of the box

  //this should only happen once in a build, per dynamic page node
  for (let node in dynamicPagePreviewRedirects) {
    //need to build a collection of redirects to pass-through
    const redirectDictByContentID = dynamicPagePreviewRedirects[node];

    createPage({
      path: node,
      component: path.resolve("./src/agility/components/DynamicPreviewPage.js"),
      context: {
        redirects: redirectDictByContentID,
      },
    });
  }
};

const createRedirects = async ({ syncClient, createRedirect, languages }) => {
  const languageCode = languages[0].code;

  const redirects = await syncClient.store.getUrlRedirections({ languageCode });

  if (!redirects || !redirects.items) return;

  await asyncForEach(redirects.items, async (redirect) => {
    let originUrl = redirect.originUrl;
    let destUrl = redirect.destinationUrl;
    if (originUrl.indexOf("~/") == 0) originUrl = originUrl.substring(1);
    if (destUrl.indexOf("~/") == 0) destUrl = destUrl.substring(1);

    const gatsbyRedirect = {
      fromPath: originUrl,
      toPath: destUrl,
      isPermanent: redirect.statusCode === 301,
      redirectInBrowser: true,
    };

    await createRedirect(gatsbyRedirect);
  });
};

const resolveLanguageCodes = (languages) => {
  return languages.map((l) => {
    return l.code;
  });
};

const resolvePagePath = (path, language, isMultiLanguage) => {
  if (isMultiLanguage) {
    return `/${language.path}${path}`;
  } else {
    return `${path}`;
  }
};
