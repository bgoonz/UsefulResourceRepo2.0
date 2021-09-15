var docstoc = {
  horizontalnav: [
    { title: "Docs Home", path: "/documentation/", hide: true },
    { title: "Get Started", path: "/documentation/tutorials/get-started/" },
    {
      title: "Tutorials",
      path: "/documentation/tutorials/",
      node: "tutorials",
      resetnav: true,
    },
    {
      title: "API Reference",
      vtitle: "API Reference Manual",
      path: "/documentation/api/",
      node: "api",
      resetnav: true,
    },
    {
      title: "On-Premise",
      vtitle: "On-Premise Deployment",
      path: "/documentation/on-premise/",
      node: "onpremise",
      resetnav: true,
    },
    {
      title: "Chatbot",
      vtitle: "Chatbots &amp; Scripting",
      path: "/documentation/chatbot/",
      node: "chatbot",
      resetnav: true,
    },
    {
      title: "Downloads",
      vtitle: "Download Mesibo SDK",
      path: "/documentation/install/",
      node: "install",
      resetnav: true,
    },
    {
      title: "Source Code",
      path: "/documentation/source-code/",
      node: "sourcecode",
      hide: true,
    },
    {
      title: "UI Modules",
      path: "/documentation/ui-modules/",
      node: "uimodules",
      hide: true,
    },
    {
      title: "Demo Apps",
      path: "/documentation/demo-apps/",
      node: "demoapps",
      hide: true,
    },
    { title: "FAQ", path: "/documentation/faq/", node: "faq", resetnav: true },
    {
      title: "Glossary",
      path: "/documentation/glossary/",
      node: "glossary",
      hide: true,
    },
    { title: "Support", path: "/support/", node: "support", resetnav: true },
    { title: "Sign In", path: "/console/", node: "support", resetnav: true },
  ],
  install: [
    {
      sectiontitle: "Download Mesibo SDK",
      section: [
        {
          path: "/documentation/install/",
          title: "Supported Platforms and Languages",
        },
        { path: "/documentation/install/android/", title: "Android" },
        { path: "/documentation/install/ios/", title: "iOS" },
        { path: "/documentation/install/javascript/", title: "Javascript" },
        { path: "/documentation/install/raspberrypi/", title: "Raspberry Pi" },
        { path: "/documentation/install/linux/", title: "Linux" },
        { path: "/documentation/install/mac/", title: "Mac" },
        { path: "/documentation/install/windows/", title: "Windows" },
        { path: "/documentation/install/python/", title: "Python" },
        {
          path: "/documentation/install/cross-platform-tools/",
          title: "Other Cross-Platform Tools",
        },
      ],
    },
  ],
  tutorials: [
    { path: "/documentation/tutorials/", title: "Mesibo Tutorials" },
    {
      sectiontitle: "Get started",
      section: [
        {
          title: "Introduction",
          path: "/documentation/tutorials/get-started/",
        },
        {
          title: "Create Users",
          path: "/documentation/tutorials/get-started/create-users/",
        },
        {
          title: "Android",
          path: "/documentation/tutorials/get-started/android/",
        },
        { title: "iOS", path: "/documentation/tutorials/get-started/ios/" },
        {
          title: "Javascript",
          path: "/documentation/tutorials/get-started/javascript/",
        },
        { title: "C/C++", path: "/documentation/tutorials/get-started/cpp/" },
        {
          title: "Python",
          path: "/documentation/tutorials/get-started/python/",
        },
        {
          title: "Sending Media & Files",
          path: "/documentation/tutorials/get-started/file-transfer/",
        },
        {
          title: "Sync Messages",
          path: "/documentation/tutorials/get-started/synchronization/",
        },
        {
          title: "Authentication",
          path: "/documentation/tutorials/get-started/auth/",
        },
      ],
    },
    {
      sectiontitle: "WhatsApp Clone",
      section: [
        {
          path: "/documentation/tutorials/open-source-whatsapp-clone/",
          title: "Preparation",
        },
        {
          path: "/documentation/tutorials/open-source-whatsapp-clone/android/",
          title: "Android",
        },
        {
          path: "/documentation/tutorials/open-source-whatsapp-clone/ios/",
          title: "iOS",
        },
        {
          path: "/documentation/tutorials/open-source-whatsapp-clone/customize/",
          title: "Customize",
        },
        {
          path: "/documentation/tutorials/open-source-whatsapp-clone/backend/",
          title: "Hosting Private APIs",
        },
        {
          path: "/documentation/tutorials/open-source-whatsapp-clone/on-premise/",
          title: "Hosting Mesibo Server",
        },
        {
          path: "/documentation/tutorials/open-source-whatsapp-clone/conclusion/",
          title: "Conclusion",
        },
      ],
    },
  ],
  api: [
    { path: "/documentation/api/", title: "API Documentation" },
    { path: "/documentation/api/", title: "Introduction" },
    {
      sectiontitle: "Real-time APIs",
      section: [
        { path: "/documentation/api/real-time-api/", title: "Introduction" },
        {
          path: "/documentation/api/real-time-api/initialization/",
          title: "Initialization APIs",
        },
        {
          path: "/documentation/api/real-time-api/messaging/",
          title: "Messaging APIs",
        },
        {
          path: "/documentation/api/real-time-api/file-transfer/",
          title: "File Transfer APIs",
        },
        {
          path: "/documentation/api/real-time-api/profiles/",
          title: "User &amp; Group Profiles APIs",
        },
        {
          path: "/documentation/api/real-time-api/utility/",
          title: "Utility APIs",
        },
        {
          path: "/documentation/api/real-time-api/data-structures/",
          title: "Data Structures",
        },
        {
          path: "/documentation/api/real-time-api/listeners/",
          title: "Listeners",
        },
      ],
    },
    {
      sectiontitle: "Voice &amp; Video Calls APIs",
      section: [
        { path: "/documentation/api/calls/", title: "Overview" },
        {
          path: "/documentation/api/calls/listeners/",
          title: "Call Listeners",
        },
        {
          path: "/documentation/api/calls/mesibocall/",
          title: "MesiboCall Class",
        },
        { path: "/documentation/api/calls/call/", title: "Call API Class" },
        {
          path: "/documentation/api/calls/callproperties/",
          title: "CallProperties Class",
        },
      ],
    },
    {
      sectiontitle: "Voice &amp; Video Conferencing APIs",
      section: [
        { path: "/documentation/api/conferencing/", title: "Introduction" },
        {
          path: "/documentation/api/conferencing/create/",
          title: "Create a Room",
        },
        { path: "/documentation/api/conferencing/android/", title: "Android" },
        { path: "/documentation/api/conferencing/ios/", title: "iOS" },
        {
          path: "/documentation/api/conferencing/javascript/",
          title: "Javascript",
        },
        {
          path: "/documentation/api/conferencing/demo/",
          title: "Open-Source App",
        },
        {
          path: "/documentation/api/conferencing/listeners/",
          title: "Group Call Listeners",
        },
        {
          path: "/documentation/api/conferencing/mesibogroupcall/",
          title: "MesiboGroupCall Class",
        },
        {
          path: "/documentation/api/conferencing/mesiboparticipant/",
          title: "MesiboParticipant Class",
        },
      ],
    },
    { path: "/documentation/api/backend-api/", title: "Backend REST APIs" },
    { path: "/documentation/api/webhooks/", title: "Mesibo webhooks" },
    {
      path: "/documentation/api/push-notifications/",
      title: "Mesibo Push Notifications",
    },
    { path: "/documentation/api/http-library/", title: "Mesibo HTTP APIs" },
  ],
  faq: [
    {
      sectiontitle: "Mesibo FAQs",
      section: [
        { path: "/documentation/faq/", title: "General" },
        { path: "/documentation/faq/messaging/", title: "Messaging" },
        {
          path: "/documentation/faq/group-messaging/",
          title: "Group Messaging",
        },
        {
          path: "/documentation/faq/storage/",
          title: "Storage - Messages &amp; File",
        },
        { path: "/documentation/faq/platform/", title: "Platform" },
        { path: "/documentation/faq/on-premise/", title: "On-Premise" },
        {
          path: "/documentation/faq/webhooks-and-push-notifications/",
          title: "Webhooks and Push Notifications",
        },
        {
          path: "/documentation/faq/security/",
          title: "Security &amp; Privacy",
        },
        { path: "/documentation/faq/http-library/", title: "HTTP Library" },
        {
          path: "/documentation/faq/pricing/",
          title: "Pricing, Customization and Terms",
        },
        { path: "/documentation/faq/demo-apps/", title: "Demo Apps" },
        { path: "/support/", title: "Support" },
        { path: "/documentation/faq/other/", title: "Other" },
      ],
    },
  ],
  onpremise: [
    {
      sectiontitle: "On-Premise Deployment",
      section: [
        {
          path: "/documentation/on-premise/",
          title: "Introduction &amp; Install",
        },
        {
          path: "/documentation/on-premise/loadable-modules/",
          title: "Loadable Modules",
        },
        { path: "/documentation/faq/on-premise/", title: "On-Premise FAQ" },
      ],
    },
  ],
  chatbot: [
    {
      sectiontitle: "Chatbots &amp; Scripting",
      section: [
        { path: "/documentation/chatbot/", title: "Introduction" },
        {
          path: "/documentation/chatbot/uploading-scripts/",
          title: "Uploading Scripts",
        },
        {
          path: "/documentation/chatbot/scripting/",
          title: "Essential Scripting",
        },
        {
          path: "/documentation/chatbot/reference/",
          title: "Javascript Class Reference",
        },
        {
          path: "/documentation/chatbot/sample-chatbot/",
          title: "Sample Chatbot App",
        },
      ],
    },
  ],
  uimodules: [{ title: "UI Modules", path: "/documentation/ui-modules/" }],
  sourcecode: [{ title: "Source Code", path: "/documentation/source-code/" }],
  demoapps: [{ title: "Demo Apps", path: "/documentation/demo-apps/" }],
  homes: [
    { path: "/", title: "Home" },
    { path: "/documentation/", title: "Docs Home" },
  ],
};
renderNav(docstoc);
