title: Fetch images from Flickr
sub: And show them in Octopress/Jekyll
date: 2012-07-21 17:53
categories:

- programming
- ruby
  tags:
- flickr
- ruby
- api
- octopress
- jekyll

---

&nbsp;

<!-- more -->

A convenient way to manage images for a blog is to host them on Flickr.

Using the Flickr API, it's possible to do lots of useful things: use Flickr to serve thumbnails, fetch the metadata associated with the image, organise your galleries by tags then show them on your blog, ...

Here is a very simple example.

## The flickraw gem

Flickraw is a very convenient gem for accessing the flickr API, making it super-easy.

Add it to your gemfile:

<script src="https://gist.github.com/3156265.js?file=Gemfile"></script>

<small>(And don't forget to run `bundle install`)</small>

## The FlickrImage plugin

**Note:** you have to define "FLICKR_KEY" and "FLICKR_SECRET" as environment variables for this script to work. <br /><small>(You can find your flickr key and secret in your Flickr interface, after having registered your app.)</small>

Put this file in the 'plugins' directory:

<script src="https://gist.github.com/3156265.js?file=flickr_image.rb"></script>

## Usage in a post

<script src="https://gist.github.com/3156265.js?file=2012-07-21-post-with-images-from-flickr.markdown_"></script>

Done !
