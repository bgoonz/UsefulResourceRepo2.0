# WMD Markdown Editor

#### A WYSIWYM (What You See Is What You Mean) [Markdown](http://daringfireball.net/projects/markdown/) editor.

WMD was originally developed by John Fraser/[Attacklab](http://attacklab.net/), and the original demo and
download site is [still available](http://wmd-editor.com/).

In late 2008, StackOverflow undertook forking the original code because John had apparently disappeared.
They successfully de-obfuscated it, and their fork is currently maintained on [GitHub](http://localhost/code/wmd/docs/index.html).

This, for better or worse, is a fork of StackOverflow's fork. There are many reasons for undertaking
this project, but the main goals include:

- Cleaning up the external API to make it easier to understand and interact with
- Allow for OO-style WMD instance creation, including multiple instances per page
- Provide a clean mechanism for extending the editor with custom commands
- **Maintain library independence** - as StackOverflow are planning on introducing a jQuery dependence with their
  upcoming "3.0" release

Please note that, as it stands now, this code is far from complete. There are still many bugs to work out,
and quite a number of features haven't even been implemented yet. However, the basic framework is there, so feel
free to try it out and extend it as much as you like.

## A Word About Icons

I'm currently including [Fugue](http://www.pinvoke.com/) icons in the default distribution, which are
licensed under a [Creative Commons Attribution 3.0 license](http://creativecommons.org/licenses/by/3.0/).

As soon as I have time, I'll replace these with MIT-licensed icons. For now, however, please note that if
you use the default icons on your site, you must provide a link back to <http://www.pinvoke.com/>.
