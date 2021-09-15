CNTX={users}; NAME={Knochenmark}; PAGE=1
curl "https://api.github.com/$CNTX/$NAME/repos?page=$PAGE&per_page=100" |
  grep -e 'git_url*' |
  cut -d \" -f 4 |
  xargs -L1 git clone





CNTX={users}; NAME={Isaac-Tait}; PAGE=1
curl "https://api.github.com/$CNTX/$NAME/repos?page=$PAGE&per_page=100" |
  grep -e 'git_url*' |
  cut -d \" -f 4 |
  xargs -L1 git clone





CNTX={users}; NAME={greglobinski}; PAGE=1
curl "https://api.github.com/$CNTX/$NAME/repos?page=$PAGE&per_page=100" |
  grep -e 'git_url*' |
  cut -d \" -f 4 |
  xargs -L1 git clone






CNTX={users}; NAME={LekoArts}; PAGE=1
curl "https://api.github.com/$CNTX/$NAME/repos?page=$PAGE&per_page=100" |
  grep -e 'git_url*' |
  cut -d \" -f 4 |
  xargs -L1 git clone





git add .gitattributes
git add        .gitignore
git add        .vscode/
git add        AuthorPal/
git add        HubEditor-UI/
git add        HubEditor/
git add        Hueren/
git add        LICENSE
git add        Leaderboard/
git add        LearnToCode/
git add        LekoArts/
git add        TaskMaster/
git add        The-NodeJS-Master-Class/
git add        actions-push-subdirectories/
git add        api.gatsbyjs.org/
git add        bare-instagram/
git add        birthday-card-generator/
git add        boilerplate-project-metricimpconverter/
git add        chakra-ui/
git add        changesets/
git add        commands.txt
git add        common-last-names/
git add        css-custom-properties-examples/
git add        css-modules-test/
git add        cssfrankfurt.de/
git add        cypressExamples/
git add        daftcode-react-pro/
git add        demo.lazywill.com/
git add        dev.greglobinski.com/
git add        digitalFont/
git add        dotfiles/
git add        elitepvpers-reminders/
git add        emilia-test/
git add        emotion-theming-multiple/
git add        emotion/
git add        example-create-react-app-styled-jsx/
git add        example-gatsby-unstated/
git add        examples/
git add        faker.js/
git add        fast-refresh-testing/
git add        favicon.icogit add
git add        fcc-drum-machine-starter-react-typescript/
git add        fcc-drum-machine-starter-react/
git add        figma-theme-ui/
git add        first-contributions/
git add        flexible-contentful/
git add        fullstack-graphql/
git add        gatsby-1/
git add        gatsby-absolute-image-paths/
git add        gatsby-app-starter-rest-api/
git add        gatsby-example-graphql2chartjs/
git add        gatsby-from-scratch/
git add        gatsby-interface/
git add        gatsby-less-issue/
git add        gatsby-minimal/
git add        gatsby-omni-font-loader/
git add        gatsby-plugin-algolia/
git add        gatsby-plugin-anchor-links/
git add        gatsby-plugin-breadcrumb/
git add        gatsby-plugin-doctype/
git add        gatsby-plugin-env-variables/
git add        gatsby-plugin-eslint/
git add        gatsby-plugin-image-color-mode/
git add        gatsby-plugin-material-ui/
git add        gatsby-plugin-matomo/
git add        gatsby-plugin-preconnect/
git add        gatsby-plugin-purgecss/
git add        gatsby-plugin-react-svg/
git add        gatsby-plugin-remote-images/
git add        gatsby-plugin-remove-console/
git add        gatsby-plugin-robots-txt/
git add        gatsby-plugin-s3/
git add        gatsby-plugin-segment-js/
git add        gatsby-plugins/
git add        gatsby-react-three-fiber/
git add        gatsby-remark-design-system-example/
git add        gatsby-remark-design-system/
git add        gatsby-sanity-theme-from-scratch/
git add        gatsby-sites-validator/
git add        gatsby-source-agilitycms/
git add        gatsby-source-behance-example/
git add        gatsby-source-behance/
git add        gatsby-source-circleci/
git add        gatsby-source-netlify/
git add        gatsby-source-potterapi/
git add        gatsby-source-sanity/
git add        gatsby-source-tmdb/
git add        gatsby-starter-base/
git add        gatsby-starter-elevator-pitch/
git add        gatsby-starter-graphql-playground/
git add        gatsby-starter-hero-blog-test08/
git add        gatsby-starter-hero-blog/
git add        gatsby-starter-kit-docs/
git add        gatsby-starter-kit/
git add        gatsby-starter-level-2/
git add        gatsby-starter-mini-catalog/
git add        gatsby-starter-minimal-blog/
git add        gatsby-starter-personal-blog/
git add        gatsby-starter-portfolio-bella/
git add        gatsby-starter-portfolio-cara/
git add        gatsby-starter-portfolio-emilia/
git add        gatsby-starter-portfolio-emma/
git add        gatsby-starter-portfolio-jodie/
git add        gatsby-starter-portfolio/
git add        gatsby-starter-prismic-i18n/
git add        gatsby-starter-prismic/
git add        gatsby-starter-simple-landing/
git add        gatsby-starter-specimens/
git add        gatsby-starter-styleguide/
git add        gatsby-starter-theme-i18n/git add
git add        gatsby-starter-theme-typescript-eslint-cypress/
git add        gatsby-starter-tmdb/
git add        gatsby-status-dashboard/
git add        gatsby-styled-blog-starter/
git add        gatsby-styled-components-issue/
git add        gatsby-theme-examples/
git add        gatsby-theme-novela/
git add        gatsby-theme-simple-docs/
git add        gatsby-themes/
git add        gatsby-webinar-getting-started/
git add        gatsby-with-prisma-client/
git add        gatsby/
git add        gddgadfgad/
git add        ghdb/
git add        github-slideshow/
git add        grid-play/
git add        gridsome.org/
git add        gulp-htmlmin/
git add        hmr-double-save-bug/
git add        infinityErgodoxKeymap/
git add        issue-32288/
git add        jQuery-contextMenu/
git add        karkoon/
git add        knochenmark.github.io/
git add        league-for-good/
git add        lekoarts-stats/
git add        lvl-2/
git add        makefile
git add        mdx-components-repro/
git add        minesweeper/
git add        minimal-blog-additional-field/
git add        minimal-blog-new-content-type/
git add        minimal-blog-yaml/
git add        my-shopify-store/
git add        ng-restaurant/
git add        notebook/
git add        override-test/
git add        package-lock.json
git add        package.json
git add        pantry-for-good/
git add        pomodoro/
git add        portfolio-test/
git add        portfolio-v2/
git add        portfolio/
git add        postcss/
git add        pp-06.03.19/
git add        qrcodejs/
git add        react-custom-share/
git add        react-design-patterns-and-best-practices/
git add        react-refresh-webpack-plugin/
git add        react-website-themes/
git add        recipebox/
git add        recipes-test/
git add        renovate.json
git add        robots.txt
git add        rock-paper-scissors/
git add        sanity-unified-normal/
git add        scrap.md
git add        sentry-javascript/
git add        shapy/
git add        speedy-gatsby-shopify/
git add        stale-bot-test/
git add        stale/
git add        static-files/
git add        store.gatsbyjs.org/
git add        superstruct/
git add        svelte-minesweeper/
git add        talks/
git add        tehtarik1913.github.io/
git add        testable-projects-fcc/
git add        thanks-contributors/
git add        theme-ui/
git add        til.greglobinski.com/
git add        unified-routes-demo/
git add        wesbos/
git add        with-gatsby-plugin-intl/
git add        www.greglobinski.com/
git add        www.lazywill.com/
