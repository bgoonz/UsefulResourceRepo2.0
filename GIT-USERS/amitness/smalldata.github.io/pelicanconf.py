#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
import os.path

# local custom submodule installation (not pip)
import bulrush

# https://github.com/textbook/textbook.github.io-source
# http://docs.getpelican.com/en/stable/settings.html

# Base configuration
AUTHOR = "Philip Shemella"
# AVATAR = '.jpg'
SITENAME = "Small Data"
SITESUBTITLE = "“Torture the data, and it will confess to anything.” – Ronald Coase"
SITEURL = "https://smalldata.dev"
PATH = "content"
TIMEZONE = "Europe/Paris"
DEFAULT_LANG = "en"
DEFAULT_DATE = "fs"

# Appearance
THEME = bulrush.PATH
PLUGIN_PATHS = ["pelican-plugins"]
PLUGINS = [
    "assets",
    #    'better_figures_and_images',
    "pelican_youtube",
    "sitemap",
    "gzip_cache",
    "minify",
]

# Setting for the better_figures_and_images plugin
# RESPONSIVE_IMAGES = True

JINJA_ENVIRONMENT = bulrush.ENVIRONMENT
JINJA_FILTERS = bulrush.FILTERS

PAGE_EXCLUDES = ["404.html"]

# summary
# SUMMARY_USE_FIRST_PARAGRAPH = True
# SUMMARY_MAX_LENGTH = 50
# SUMMARY_BEGIN_MARKER
# SUMMARY_END_MARKER

# sitemap
SITEMAP = {
    "format": "xml",
    "priorities": {"articles": 0.5, "indexes": 0.5, "pages": 0.5},
    "changefreqs": {"articles": "monthly", "indexes": "daily", "pages": "monthly"},
}

# display menu/navbar
DISPLAY_PAGES_ON_MENU = False
DISPLAY_CATEGORIES_ON_MENU = False

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = "feeds/all.atom.xml"
FEED_ALL_RSS = "feeds/all.rss.xml"
# FEED_ALL_ATOM = None
# FEED_ALL_RSS = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# navbar links
MENUITEMS = (("All posts", "/archives.html"), ("About", "/about.html"))

# Blogroll
LINKS = (
    (
        "Advisor or Adviser",
        "https://medium.com/dirty-data/advisor-or-adviser-cc063acef267",
    ),
    (
        "Data are Beautiful",
        "https://medium.com/dirty-data/data-are-beautiful-356332cdb81",
    ),
    (
        "The Physics of Babies",
        "https://medium.com/@philshem/life-in-the-baby-universe-f52561c4a8ae",
    ),
)

# Social widget
SOCIAL = (
    ("Twitter", "https://twitter.com/philshem"),
    ("GitHub", "https://github.com/philshem"),
    ("Stack Overflow", "https://opendata.stackexchange.com/users/1511/philshem"),
    ("E-mail", "mailto:philshem+smalldata@pm.me"),  # 'https://mailhide.io/e/2krEd'
)
#     ('Instagram', 'https://instagram.com/philshem'),

# Other settings
# GITHUB_URL = 'https://github.com/textbook/textbook.github.io-source'
TWITTER_USERNAME = "philshem"
# MAILCHIMP = dict(
#    domain='jonrshar.us15.list-manage.com',
#    user_id='7ada11180797f3af73228bf0b',
#    list_id='d172abcbd2',
#    rewards_url='http://eepurl.com/cNv6Rb',
# )
LICENSE = "CC BY-SA 4.0"

DELETE_OUTPUT_DIRECTORY = True
OUTPUT_RETENTION = [".git", ".gitignore", "ignore/"]

# Static files
STATIC_PATHS = ["images", "extra"]
EXTRA_PATH_METADATA = {
    "extra/custom.css": {"path": "custom.css"},
    "extra/robots.txt": {"path": "robots.txt"},
    "extra/favicon.ico": {"path": "favicon.ico"},
    "extra/CNAME": {"path": "CNAME"},
    # 'extra/LICENSE': {'path': 'LICENSE'},
    # 'extra/README': {'path': 'README'},
}
# IGNORE_FILES = ['.#*', 'README.md']

DEFAULT_PAGINATION = 5

# URL settings
SLUGIFY_SOURCE = "basename"
# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True

ARTICLE_PATHS = ["articles"]
ARTICLE_URL = "posts/{slug}/"
ARTICLE_SAVE_AS = "posts/{slug}/index.html"
PAGE_URL = "{slug}.html"
PAGE_SAVE_AS = "{slug}.html"

# Don't need the author pages
AUTHOR_SAVE_AS = ""
AUTHOR_URL = ""
ARCHIVES_SAVE_AS = "archives.html"
# YEAR_ARCHIVE_SAVE_AS = '{date:%Y}/index.html'
