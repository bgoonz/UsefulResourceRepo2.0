# General guidelines

Help Google find your pages

---

###

### General guidelines

### Help Google find your pages

- <span id="6fe9">Ensure that all pages on the site can be reached by a link from another findable page. The referring link should include either text or, for images, an alt attribute, that is relevant to the target page. Crawlable links are `<a>` <a href="https://developers.google.com/search/docs/advanced/guidelines/links-crawlable" class="markup--anchor markup--li-anchor">tags with an href attribute</a>.</span>
- <span id="f878">Provide a <a href="http://sitemaps.org/" class="markup--anchor markup--li-anchor">sitemap file</a> with links that point to the important pages on your site. Also provide a page with a human-readable list of links to these pages (sometimes called a site index or site map page).</span>
- <span id="2ee0">Limit the number of links on a page to a reasonable number (a few thousand at most).</span>
- <span id="9235">Make sure that your web server correctly supports the `If-Modified-Since` HTTP header. This feature directs your web server to tell Google if your content has changed since we last crawled your site. Supporting this feature saves you bandwidth and overhead.</span>
- <span id="a839">Use the robots.txt file on your web server to manage your crawling budget by preventing crawling of infinite spaces such as search result pages. Keep your robots.txt file up to date. <a href="https://developers.google.com/search/docs/advanced/robots/robots-faq" class="markup--anchor markup--li-anchor">Learn how to manage crawling with the robots.txt file</a>. Test the coverage and syntax of your robots.txt file using the <a href="https://www.google.com/webmasters/tools/robots-testing-tool" class="markup--anchor markup--li-anchor">robots.txt Tester</a>.</span>

**Ways to help Google find your site:**

- <span id="417a"><a href="https://developers.google.com/search/docs/advanced/crawling/ask-google-to-recrawl" class="markup--anchor markup--li-anchor">Ask Google to crawl your pages</a>.</span>
- <span id="2ba7">Make sure that any sites that should know about your pages are aware your site is online.</span>

### Help Google understand your pages

- <span id="6069">Create a useful, information-rich site, and write pages that clearly and accurately describe your content.</span>
- <span id="16eb">Think about the words users would type to find your pages, and make sure that your site actually includes those words within it.</span>
- <span id="5f2b">Ensure that your `<title>` elements and `alt` attributes are descriptive, specific, and accurate.</span>
- <span id="86c8">Design your site to have a clear conceptual page hierarchy.</span>
- <span id="aed5">Follow our recommended best practices for <a href="https://developers.google.com/search/docs/advanced/guidelines/google-images" class="markup--anchor markup--li-anchor">images</a>, <a href="https://developers.google.com/search/docs/advanced/guidelines/video" class="markup--anchor markup--li-anchor">video</a>, and <a href="https://developers.google.com/search/docs/guides/intro-structured-data" class="markup--anchor markup--li-anchor">structured data</a>.</span>
- <span id="67f4">When using a content management system (for example, Wix or WordPress), make sure that it creates pages and links that search engines can crawl.</span>
- <span id="5fcd">To help Google fully understand your site’s contents, allow all site assets that would significantly affect page rendering to be crawled: for example, CSS and JavaScript files that affect the understanding of the pages. The Google indexing system renders a web page as the user would see it, including images, CSS, and JavaScript files. To see which page assets that Googlebot cannot crawl use the <a href="https://support.google.com/webmasters/answer/9012289" class="markup--anchor markup--li-anchor">URL Inspection tool</a>; to debug directives in your robots.txt file, use the <a href="https://support.google.com/webmasters/answer/6062598" class="markup--anchor markup--li-anchor">robots.txt Tester</a> tool.</span>
- <span id="b8ef">Allow search bots to crawl your site without session IDs or URL parameters that track their path through the site. These techniques are useful for tracking individual user behavior, but the access pattern of bots is entirely different. Using these techniques may result in incomplete indexing of your site, as bots may not be able to eliminate URLs that look different but actually point to the same page.</span>
- <span id="e5c6">Make your site’s important content visible by default. Google is able to crawl HTML content hidden inside navigational elements such as tabs or expanding sections, however we consider this content less accessible to users, and believe that you should make your most important information visible in the default page view.</span>
- <span id="58bf">Make a reasonable effort to ensure that advertisement links on your pages do not affect search engine rankings. For example, use <a href="https://developers.google.com/search/docs/advanced/robots/intro" class="markup--anchor markup--li-anchor">robots.txt</a>, `rel="nofollow"`, or `rel="sponsored"` to prevent advertisement links from being followed by a crawler.</span>

### Help visitors use your pages

- <span id="76dc">Try to use text instead of images to display important names, content, or links. If you must use images for textual content, use the `alt` attribute to include a few words of descriptive text.</span>
- <span id="d45e">Ensure that all links go to live web pages. Use <a href="https://validator.w3.org/" class="markup--anchor markup--li-anchor">valid HTML</a>.</span>
- <span id="8b66">Optimize your page loading times. Fast sites make users happy and improve the overall quality of the web (especially for those users with slow Internet connections). Google recommends that you use tools like <a href="https://developers.google.com/speed/pagespeed/insights/" class="markup--anchor markup--li-anchor">PageSpeed Insights</a> and <a href="https://www.webpagetest.org/" class="markup--anchor markup--li-anchor">Webpagetest.org</a> to test the performance of your page.</span>
- <span id="5f39">Design your site for all device types and sizes, including desktops, tablets, and smartphones. Use the <a href="https://search.google.com/test/mobile-friendly" class="markup--anchor markup--li-anchor">Mobile-Friendly Test</a> to test how well your pages work on mobile devices, and get feedback on what needs to be fixed.</span>
- <span id="5f9b">Ensure that your site <a href="https://developers.google.com/search/docs/advanced/guidelines/browser-compatibility" class="markup--anchor markup--li-anchor">appears correctly in different browsers</a>.</span>
- <span id="717b">If possible, <a href="https://developers.google.com/search/docs/advanced/security/https" class="markup--anchor markup--li-anchor">secure your site’s connections</a> with HTTPS. Encrypting interactions between the user and your website is a good practice for communication on the web.</span>
- <span id="4156">Ensure that your pages are useful for readers with visual impairments, for example, by testing usability with a screen-reader.</span>

### Quality guidelines

These quality guidelines cover the most common forms of deceptive or manipulative behavior, but Google may respond negatively to other misleading practices not listed here. It’s not safe to assume that just because a specific deceptive technique isn’t included on this page, Google approves of it. Website owners who spend their energies upholding the spirit of the basic principles will provide a much better user experience and subsequently enjoy better ranking than those who spend their time looking for loopholes they can exploit.

If you believe that another site is abusing Google’s quality guidelines, please let us know by <a href="https://www.google.com/webmasters/tools/spamreport" class="markup--anchor markup--p-anchor">filing a spam report</a>. Google prefers developing scalable and automated solutions to problems, and will use the report for further improving our spam detection systems.

### Basic principles

- <span id="0251">Make pages primarily for users, not for search engines.</span>
- <span id="f565">Don’t deceive your users.</span>
- <span id="5f8a">Avoid tricks intended to improve search engine rankings. A good rule of thumb is whether you’d feel comfortable explaining what you’ve done to a website that competes with you, or to a Google employee. Another useful test is to ask, “Does this help my users? Would I do this if search engines didn’t exist?”</span>
- <span id="9acc">Think about what makes your website unique, valuable, or engaging. Make your website stand out from others in your field.</span>

### Specific guidelines

**Avoid** the following techniques:

- <span id="2686"><a href="https://developers.google.com/search/docs/advanced/guidelines/auto-gen-content" class="markup--anchor markup--li-anchor">Automatically generated content</a></span>
- <span id="a921">Participating in <a href="https://developers.google.com/search/docs/advanced/guidelines/link-schemes" class="markup--anchor markup--li-anchor">link schemes</a></span>
- <span id="bbd9">Creating pages with <a href="https://support.google.com/webmasters/answer/66361" class="markup--anchor markup--li-anchor">little or no original content</a></span>
- <span id="7ddf"><a href="https://developers.google.com/search/docs/advanced/guidelines/cloaking" class="markup--anchor markup--li-anchor">Cloaking</a></span>
- <span id="e9b8"><a href="https://developers.google.com/search/docs/advanced/guidelines/sneaky-redirects" class="markup--anchor markup--li-anchor">Sneaky redirects</a></span>
- <span id="47d2"><a href="https://developers.google.com/search/docs/advanced/guidelines/hidden-text-links" class="markup--anchor markup--li-anchor">Hidden text or links</a></span>
- <span id="7ae2"><a href="https://developers.google.com/search/docs/advanced/guidelines/doorway-pages" class="markup--anchor markup--li-anchor">Doorway pages</a></span>
- <span id="98d8"><a href="https://developers.google.com/search/docs/advanced/guidelines/scraped-content" class="markup--anchor markup--li-anchor">Scraped content</a></span>
- <span id="156f">Participating in <a href="https://developers.google.com/search/docs/advanced/guidelines/affiliate-programs" class="markup--anchor markup--li-anchor">affiliate programs without adding sufficient value</a></span>
- <span id="42e4">Loading pages with <a href="https://developers.google.com/search/docs/advanced/guidelines/irrelevant-keywords" class="markup--anchor markup--li-anchor">irrelevant keywords</a></span>
- <span id="f583">Creating pages with <a href="https://developers.google.com/search/docs/advanced/guidelines/malicious-behavior" class="markup--anchor markup--li-anchor">malicious behavior</a>, such as phishing or installing viruses, trojans, or other badware</span>
- <span id="777a">Abusing <a href="https://developers.google.com/search/docs/guides/sd-policies" class="markup--anchor markup--li-anchor">structured data</a> markup</span>
- <span id="6c9f">Sending <a href="https://developers.google.com/search/docs/advanced/guidelines/automated-queries" class="markup--anchor markup--li-anchor">automated queries</a> to Google</span>

**Follow** good practices:

- <span id="68a7">Monitoring your site for <a href="https://developers.google.com/search/docs/advanced/security/what-is-hacked" class="markup--anchor markup--li-anchor">hacking</a> and removing hacked content as soon as it appears</span>
- <span id="8141">Preventing and removing <a href="https://developers.google.com/search/docs/advanced/guidelines/user-gen-spam" class="markup--anchor markup--li-anchor">user-generated spam</a> on your site</span>

If your site violates one or more of these guidelines, then Google may take <a href="https://support.google.com/webmasters/answer/9044175" class="markup--anchor markup--p-anchor">manual action</a> against it. Once you have remedied the problem, you can <a href="https://support.google.com/webmasters/answer/35843" class="markup--anchor markup--p-anchor">submit your site for reconsideration</a>.

[View original.](https://medium.com/p/8e797e841cc6)

Exported from [Medium](https://medium.com) on July 13, 2021.
