---
title: Quake Data Viz US
description: Real-time data visualizations of earthquakes in the United States
projectUrl: "https://www.gatsbyjs.com/starters/willjw3/gatsby-starter-developer-diary/"
codeUrl: "https://github.com/willjw3/gatsby-starter-developer-diary"
date: "2021-05-10"
tags: ["nodejs", "typescript", "react", "d3", "html", "css"]
image: ../src/images/quake-data-viz.jpg
pagetype: project
---

Built with Create React App(Node.js, TypeScript and React), D3.js, HTML5 and CSS3.

A data visualization SPA that takes real-time updates from the USGS Earthquake Catalog API and displays the data three ways: geographically on a map, numerically in a bar chart, and textually in a list.

[Source Code](https://github.com/willjw3/quake-data-viz)  
[Website](https://quake-data-viz.netlify.app)

**Concept**  
I wanted to build a data visualization that combined three popular technologies in web development, React, TypeScript, and D3.js. Both React and D3.js are made to interact with the DOM and don't play very nicely together, so using both of them together requires a solid understanding of both. To that end, I felt that even if things didn't work out exactly as I had hoped, it would still be a meaningful learning experience. I wanted to make an almost-completely data-driven web page using an API that delivered near-real-time data along with GeoJSON data for a map.

**Execution**  
Having had prior experience with the USGS Earthquake Catalog API made getting and shaping the data easy. However, ensuring type safety with TypeScript made for slow-going. Also, much of the D3.js documentation includes examples where svg elements are added using JavaScript, but as much as possible, I wanted to add svg elements directly to the jsx in the render function of the US map component.

**Result**  
Though the design could be better, I'm happy overall with the way the visualization page looks. It still needs some work in terms of performance; I used React's Context API for state management and would like to store freshly fetched data using a caching scheme so that when a user toggles between data-reporting frequencies (last hour, last 24 hours, or last 7 days) the updates happen a lot faster than they do at present. I also plan to add a loading spinner component to keep the page from jumping when selecting data by state, and to fill the blank screen on initial page load/refresh.
