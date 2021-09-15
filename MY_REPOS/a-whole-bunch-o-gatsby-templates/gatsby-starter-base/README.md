
> The project is abandoned in favor of [gatsby-starter-kit](https://github.com/greglobinski/gatsby-starter-kit)


## Description

This repo contains a series of starters for [GatsbyJS](https://gatsbyjs.org) v2.

The starters are progressively enhanced from the simplest one to the most advanced one.

You can choose between:

- minimal
- addons
- mdposts
- mdpages
- master

All starters deliver an opinionated structure of files and components but no styles at all.

> Please remember that GatsbyJS v2 is still in beta.

## Folder structure
```
root
  ├── assets
  ├── content
  │   ├── meta
  │   │   ├── config.js
  │   │   └── menu.js
  │   ├── pages
  │   │   ├── 1--about
  │   │   ├── 2--starters
  │   │   ...
  │   ├── parts
  │   │   ├── authorNote.md
  │   │   └── footnote.md
  │   └── posts
  │   │   ├── 2017-10-01--tow-thing
  │   │   ├── 2017-10-03--be-who-you
  │   │   ...  
  └── src  
      ├── components
      │   ├── Article
      │   │   ├── Article.js
      │   │   ├── BodyText.js
      │   │   └── Heading.js      
      │   ├── Blog
      │   │   ├── Blog.js
      │   │   └── BlogItem.js       
      │   ├── Footer
      │   │   └── Footer.js        
      │   ├── Header
      │   │   ├── Branding.js
      │   │   └── Header.js        
      │   ├── Layout
      │   │   └── Layout.js        
      │   ├── List
      │   │   ├── List.js
      │   │   └── ListItem.js        
      │   ├── Menu
      │   │   ├── Menu.js
      │   │   └── MenuItem.js        
      │   ├── Page
      │   │   └── Page.js        
      │   ├── Post
      │   │   ├── Author.js
      │   │   ├── Comments.js
      │   │   ├── Meta.js
      │   │   ├── NextPrev.js
      │   │   ├── Post.js
      │   │   └── Share.js         
      │   └── Seo
      │       └── Seo.js        
      ├── pages
      │   ├── 404.js
      │   ├── about.js
      │   ├── blog.js
      │   ├── contact.js
      │   └── index.js      
      └── templates
          ├── CategoryTemplate.js
          ├── PageTemplate.js
          └── PostTemplate.js
```

## Features
- Content in **Markdown** files (posts, pages and parts) placed in dedicated folder `content`
- **Code** syntax highlighting
- Responsive, optimized **images** (lazy loading, srcset, webp)
- **Comments** - [Facebook](https://developers.facebook.com/docs/plugins/comments/)
- Post **categories**
- **Category** pages
- Social **share buttons** - [react-custom-share](https://www.npmjs.com/package/react-custom-share)
- Google **Analytics**
- XML **site map**
- **SVG** icons - [react-icons]
(https://www.npmjs.com/package/react-icons)
- **SEO** (robot.txt, general and OpenGraph tags)
- **Linting*8 - (ESLint)[https://eslint.org/] with [cra config](https://www.npmjs.com/package/eslint-config-react-app)
- Code **formating** - [Prettier](https://github.com/prettier/prettier)
- Environment **variables - [dotenv](https://www.npmjs.com/package/dotenv)

## Usage

### Default usage

After iInstalling the starter in a 'GatsbyJS way' you will get a website with all features listed above. Your installation will be build on the `master` branch of the repository.

```
gatsby new [NEW_DIRECTORY_FOR_YOUR_SITE] https://github.com/greglobinski/gatsby-starter-base.git

cd [NEW_DIRECTORY_FOR_YOUR_SITE]

gatsby develop
```

### Advanced usage

If you want to install any other version of the starter than `master` you need a different procedure, you need to clone the repo.

> If you know what you do you can of course clone the original repo. But if you not please fork it first.

Log in to your Github account. Open the [repo](https://github.com/greglobinski/gatsby-starter-base) page and click **Fork** button in the top right corner. Then open the page of your forked repo - https://github.com/[yourgithubname]/gatsby-starter-base - and get the link from the green **Clone or download** button. 

```
git clone [URL_OF_YOUR_FORKED_REPOSITORY] [NEW_DIRECTORY_FOR_YOUR_SITE]

cd [NEW_DIRECTORY_FOR_YOUR_SITE]
```
Now list branches of the repo.

```
git branch -a 
```
You will see a list of branches but only one is traced locally - `master`.
Let's assume that you want to install the `minimal` version. You have to tell git to trace the branch.

```
git checkout --track -b minimal origin/minimal
```

You should see
```
>>> Switched to a new branch 'minimal'
>>> Branch 'minimal' set up to track remote branch 'minimal' from 'origin'.
```

List the branches again.

```
git branch -a
```
Both branches `master` and `minimal` are traced locally now and `minimal` is the current branch. 

You are ready to install dependencies and launch the webserver.

```
yarn install

gatsby develop
```
As before you can use `npm` instead of `yarn`.

You can repeat the procedure with any of the branches. 

More tips for managing (merging) different branches soon. So stay tuned by following me here on github or Twitter [@greglobinski](https://twitter.com/greglobinski)

## Support

If you find this idea of progressively enhanced versions of a starter do not forget to give the repo a Star. Thank you. 

Feel free to leave the feedback, tweet me or open an issue.

## License

MIT License

Copyright (c) 2017 gatsbyjs

Copyright (c) 2018 greg lobinski

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
