# HeySugar (Gatsby)

HeySugar is an open-source, self hosted, blood sugar management application for type one and type two diabetics. HeySugar is developed with Jamstack in mind and is made up of two separate applications:

- A front end to display blood sugar results
- An application to log blood readings and update the website

## Front End

The front end is developed with Gatsby and the core functionality is passed into a Gatsby website through our Gatsby Theme which means we can release patches and enhancements to users via NPM.

## The Tracker

The blood tracking application has been developed with Sanity. This means you will need to create an account on the Sanity platform in order to use HeySugar.

We also created a Sanity plugin to take care of this for you. Just like the Gatsby Theme, any changes we make to the Sanity Schema will be published through this plugin. This means you won't need to make any changes to the Sanity system, unless you want to customise your own instance of HeySugar.

## Install with Sanity Create

To make things easy for you, we have partnered with [Sanity](https://sanity.io) and created a Sanity Create Template. This means you can clone and deploy HeySugar with a few clicks from the [Sanity Create Webpage](https://www.sanity.io/create?template=HeySugar%2Fsanity-template-gatsby-hey-sugar).
