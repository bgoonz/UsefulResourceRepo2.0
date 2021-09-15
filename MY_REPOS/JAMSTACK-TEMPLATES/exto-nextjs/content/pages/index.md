---
title: Home
hide_title: true
sections:
    - section_id: hero
      type: section_hero
      title: "Hi, I'm Stackbit Exto Portfolio Theme."
      content: >-
          This section can contain a subtitle or tagline. The recommended length is
          one to three sentences, but can be changed as you prefer.
      actions:
          - label: Let's talk
            url: /contact
            style: button
    - section_id: latest-projects
      type: section_portfolio
      layout_style: mosaic
      title: Recent Work
      subtitle: An optional subtitle of the section
      projects_number: 6
      view_all_label: View All
      view_all_url: portfolio
    - section_id: services
      type: section_grid
      title: What We Do
      subtitle: An optional subtitle of the section
      col_number: two
      is_numbered: true
      grid_items:
          - title: Service Title
            content: >-
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisl
                ligula, cursus id molestie vel, maximus aliquet risus. Vivamus in nibh
                fringilla, fringilla.
          - title: Service Title
            content: >-
                Donec lobortis velit sed suscipit lobortis. Ut non quam metus. Nullam
                a maximus mi. Quisque justo nunc, sollicitudin euismod euismod at,
                tincidunt ut tellus.
          - title: Service Title
            content: >-
                Sed laoreet magna commodo libero euismod sodales. Nunc ac libero
                convallis, interdum ligula vel, pretium diam. Integer commodo sem at
                dui sollicitudin.
          - title: Service title
            content: >-
                Vestibulum a nunc ut eros condimentum posuere. Nullam dapibus quis
                nunc non interdum. Pellentesque tortor ligula, gravida ac commodo eu.
    - section_id: testimonials
      type: section_testimonials
      title: Testimonials
      subtitle: An optional subtitle of the section
      col_number: three
      testimonials:
          - author: Sean Salazar
            avatar: images/sean_salazar.jpg
            avatar_alt: Sean Salazar's photo
            content: >-
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisl
                ligula, cursus id molestie vel, maximus aliquet risus. Vivamus in nibh
                fringilla.
          - author: Aubrey Hoover
            avatar: images/aubrey_hoover.jpg
            avatar_alt: Aubrey Hoover's photo
            content: >-
                Vestibulum a nunc ut eros condimentum posuere. Nullam dapibus quis
                nunc non interdum. Pellentesque tortor ligula, gravida ac commodo eu.
          - author: Deegan Wallace
            avatar: images/deegan_wallace.jpg
            avatar_alt: Deegan Wallace's photo
            content: >-
                Sed laoreet magna commodo libero euismod sodales. Nunc ac libero
                convallis, interdum ligula vel, pretium diam.
    - section_id: latest-posts
      type: section_posts
      title: Latest from the Blog
      subtitle: An optional subtitle of the section
      posts_number: 3
      col_number: three
      actions:
          - label: View Blog
            url: blog
            style: button
seo:
    title: Stackbit Exto Theme
    description: The preview of the Exto theme
    extra:
        - name: 'og:type'
          value: website
          keyName: property
        - name: 'og:title'
          value: Stackbit Exto Theme
          keyName: property
        - name: 'og:description'
          value: The preview of the Exto theme
          keyName: property
        - name: 'og:image'
          value: images/exto_preview.png
          keyName: property
          relativeUrl: true
        - name: 'twitter:card'
          value: summary_large_image
        - name: 'twitter:title'
          value: Stackbit Exto Theme
        - name: 'twitter:description'
          value: The preview of the Exto theme
        - name: 'twitter:image'
          value: images/exto_preview.png
          relativeUrl: true
layout: advanced
---
