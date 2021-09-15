---
title: Episodes
sections:
  - type: hero_section
    title: Show Me What You Got
    align: center
    padding_top: medium
    padding_bottom: small
    has_border: true
    background_color: none
  - type: blog_feed_section
    blog_feed_cols: three
    enable_cards: true
    show_recent: false
    show_date: true
    show_categories: false
    show_author: false
    show_excerpt: true
    show_image: true
    padding_top: small
    padding_bottom: large
    has_border: true
    background_color: none
    background_image: images/pattern.svg
    background_image_repeat: repeat
    background_image_size: auto
    background_image_opacity: 98
  - type: form_section
    title: Get Updates Straight Into your Inbox
    title_align: center
    content_align: center
    form_position: bottom
    form_layout: inline
    form_id: subscribeForm
    form_action: /thank-you
    form_fields:
      - input_type: email
        name: email
        label: Email
        default_value: Your email address
        is_required: true
        options:
          - Name
          - lorem-ipsum
    submit_label: Contact
    padding_top: medium
    padding_bottom: medium
    has_border: true
    background_color: secondary
    form_width: fifty
    enable_card: true
  - section_id: lorem-ipsum
    subtitle: Latest Content
    features:
      - title: lorem-ipsum
        subtitle: lorem-ipsum
        content: >
          ##
          ![](/\_static/app-assets/images/26220582\_182891932456513\_3210798894849671175\_o.jpeg)Lorem
          ipsum


          Lorem ipsum dolor sit amet, **consectetur adipiscing elit**, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.


          *   Lorem ipsum

          *   dolor sit amet
        actions: []
        image_alt: lorem-ipsum
        video_embed_html: >-
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        media_position: top
        media_width: fifty
        align: left
        type: feature
        image: /images/26220582_182891932456513_3210798894849671175_o.jpeg
    feature_padding_vert: large
    align: center
    padding_top: large
    padding_bottom: medium
    has_border: true
    background_color: secondary
    background_image_opacity: 0
    background_image_size: cover
    background_image_position: center center
    background_image_repeat: no-repeat
    type: features_section
    background_image: /images/hero-background.jpg
seo:
  title: Episodes
  description: This is the episodes page
  extra:
    - name: 'og:type'
      value: website
      keyName: property
    - name: 'og:title'
      value: Episodes
      keyName: property
    - name: 'og:description'
      value: This is the episodes page
      keyName: property
    - name: 'og:image'
      value: images/post-9.jpg
      keyName: property
      relativeUrl: true
    - name: 'twitter:card'
      value: summary_large_image
    - name: 'twitter:title'
      value: Episodes
    - name: 'twitter:description'
      value: This is the episodes page
    - name: 'twitter:image'
      value: images/post-9.jpg
      relativeUrl: true
layout: advanced
---
