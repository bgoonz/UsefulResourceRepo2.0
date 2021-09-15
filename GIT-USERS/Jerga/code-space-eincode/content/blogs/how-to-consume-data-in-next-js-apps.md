---
title: How to consume data in Next.js apps
subtitle: The way data is fetched on Next.js will affect the pre-rendering strategy applied. Do you know them?
date: 2021-10-10
slug: how-to-consume-data-in-next-js-apps
author: Filip Jerga
rating: 3
coverImage: https://cdn.sanity.io/images/55mm68d3/production/98d581fb1463a4ec94de31aa9ee7bb95ebc9c486-1400x933.jpg?h=600&fm=jpg&q=70
---

# How to consume data in Next.js apps

## The way data is fetched on Next.js will affect the pre-rendering strategy applied. Do you know them?

![TODO: provide alt](https://cdn.sanity.io/images/55mm68d3/production/98d581fb1463a4ec94de31aa9ee7bb95ebc9c486-1400x933.jpg?h=600&fm=jpg&q=70)</div>

---

<div>

## Table of contents:

· A bit of web apps history: swinging back and forth
· How to consume the data on Next.js
— getStaticProps & the SSG approach
— getServerSideProps & the SSR on-demand approach
— Extra benefit of server-side functions
— Dynamic routes & getStaticPaths function
· Bonus: Serverless functions
· Demo app
· Conclusion

## Resources

Full Next JS Course: [https://academy.eincode.com/next.js](https://academy.eincode.com/courses/complete-next-js-with-react-node-beautiful-portfolio-app)

## A bit of web apps history: swinging back and forth

In the old times, the apps’ core was on the back end, running on PHP, Ruby, etc.

Just open a WordPress website and navigate between pages: you’ll see that a new HTML doc is requested every time you navigate a different page. The heavy lifting is done server-side to generate the HTML with its content.

Then, around 2010, web apps started to shift to the client-side, and the focus swung too much, so most of the data requests were made on the client. That impacted SEO because the HTML content was rendered at runtime, with the help of JavaScript, and loading these apps on low-end devices meant poor user experience.

React apps (and others as well, like Angular, Vue, etc.) used to fetch most of the data inside componentDidMount() lifecycle hooks methods in class-based components or inside useEffect() hooks in functional components.

Around 2016, the focus swang back to the server-side, but this time not that much, and one of the frameworks to impulse this is Next.js.js.

## How to consume the data on Next.js.js

The main feature of Next.js is that it serves server-side pre-rendered HTML pages.

There are 2 functions we can use to fetch data on the server-side when using Next.js:

**getStaticProps & getServerSideProps**.

The framework calls these functions at different times:

- getStaticProps = gets called at **BUILD TIME** = Static Site Generation approach.
- getServerSideProps = gets called at **REQUEST TIME** = Server Side Rendering on-demand approach.

So, pages are served differently depending on the functions we use to fetch data. If not specified, all pages are pre-rendered at BUILD TIME and served statically. E.g., a page with just:

`<h1>Hello World</h1>`

as it doesn’t need to fetch extra data, it is pre-rendered at BUILD TIME.

But….how to choose between the two when we need to fetch data?

## getStaticProps & the SSG approach

    export async function getStaticProps(context) {
      // some back end code here
      return {
        props: {}, // will be passed to the page component as props
      }
    }index.js

Whenever possible, use **getStaticProps** because the HTML is going to be generated at BUILD TIME, and the page is going to be stored and served as a static asset. This is a JAMStack or SSG (Static Site Generation) approach, e.g., same as [Gatsby](https://www.gatsbyjs.com/).

The result of choosing an SSG approach brings the benefits of speed because when a request from the client-side is made, the page is ready to be served.

There’s one situation when we might not want to use this approach: when we need fresh data on our page, like, for example, in a trading app, when showing the Bitcoin price. This price changes every minute, so it would not be enjoyable to generate the app’s build every minute to have fresh data.

To address this issue of getting fresh data, we can still have SSG and add some client-side fetching for the fresh data.

Calling **componentDidMount**, or **useEffect** works as usual, and you can fetch data on the client-side. This is particularly useful when content is specific to a user when they’re logged in, for example.

The process of updating some HTML content on the page when the JavaScript runs on the browser is called hydration, so you’ll see this term a lot when working with pre-rendered apps.

To know more about **getStaticProps**, check out this [official documentation](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation).

## getServerSideProps & the SSR on-demand approach

    export async function getServerSideProps(context) {
      //some back end code here
      return {
        props: {}, // will be passed to the page component as props
      }
    }index.js

If the solution of using SSG + client-side fetching is not your cup of tea, then, **getServerSideProps** function is the solution to your problems.

The SSR on-demand approach using getServerSideProps is slower than getStaticProps because JavaScript needs to run on the server-side to fetch the data and pre-render the page content on the fly.

Tip: just one approach can be used on a page, as the framework throws an error when both functions are present.

To know more about getServerSideProps, check out this [official documentation](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering).

## An extra benefit of server-side functions

getStaticProps and getServerSideProps are NOT bundled and shipped to the browser, so we can write server-side code there, like interacting with databases, and so on.

Using React, no server-side can be written because it is bundled and shipped to the browser.

## Dynamic routes & getStaticPaths function

When having dynamic routes in an app, like **`/products/${id}`**, Next.js wants to know at build time the possible list of ids:

    // this code belongs to some dynamic route page, like /products/:id

    export async function getStaticPaths() {
      // some back end code here
      return {
        paths: [
          { params: { ... } }
        ],
        fallback: true or false
      };
    }

    // Here is an example of the shape of the data that must be returned by this function:
    return {
      paths: [
        { params: { id: '1' } },
        { params: { id: '2' } }
      ],
      fallback: ...
    }[id].js

**Ids** should correspond to your structure of data.

Also, you need to specify the fallback option, which is boolean. You can keep it false by default.

You can learn more about this function on this [official documentation](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation).

## Bonus: Serverless functions

With Next.js, there’s no need to deploy serverless functions separately to the cloud. Now, they’re part of the app and are deployed when we deploy the app. This is super handy!

All the serverless functions must be placed inside the **/pages/api** folder, and the name of the JS file is used to create the URL where we can call it. E.g: a **/pages/folder/api/subscription.js** function can be called at **localhost:3000/api/subscription**.

    // pages/api/subscription.js

    export default function handler(req, res){
       //some code here to save the email to a database
       const email = req.body.email;
       return res.status(200).json({text: `${email} successfully subscribed`});
    }subscription.js

## Demo app

Enough of theory. Let’s see a real-life example.

The live app can be seen here:[https://next-ecommerce-demo.vercel.app/](https://next-ecommerce-demo.vercel.app/)

You can find the app repo here: [https://github.com/estebanmunchjones2019/next-ecommerce-demo](https://github.com/estebanmunchjones2019/next-ecommerce-demo)

The app looks like this on the browser:

<div class="blog-image blog-image-center">![](https://cdn.sanity.io/images/55mm68d3/production/ea74d28a8d0fe558c2be4266b34c73bae9a1413a-1400x875.png?h=600&fm=jpg&q=70&fit=max)</div>

The app structure is as follows:

    components
    — — -> product.js
    — — -> products.js
    — — -> subscription.js
    pages
    — — -> api
    — — — — → subscription.js
    — — -> pages
    — — -> products
    — — — — →[id].js
    — — -> _app.js
    — — -> index.js

For the sake of keeping this article short, let’s see the 3 more important files:

    // pages/products/[id].js

    import { getProduct, getProductsIds } from '../../actions'
    import Link from 'next/link'

    export default function ProductDetail({product}){
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2 className="pt-5">{product.name}</h2>
                        <img
                        className="pt-5"
                        src={product.imageUrl}
                        alt={product.name}
                        style={{maxWidth: '400px'}}
                        />
                        <h4 className="pt-5 pb-3">{product.description}</h4>
                        <button className="btn btn-primary me-3">Buy now</button>
                        <button className="btn btn-primary">Add to cart</button>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="col">
                        <Link href="/">
                            <a className="text-primary"><u>Back to Home</u></a>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    //hey Next, these are the possible id's
    export async function getStaticPaths() {
        const paths = await getProductsIds()
        return {
            paths,
            fallback: false
        }
    }

    export async function getStaticProps({params}){
        console.log('params.id', params.id)
        const product = await getProduct(params.id);
        return {
          props: {
            product
          }
        }
      }

    [id].js

    // pages/index.js

    // import styles below, scoped to this component
    import styles from '../styles/Home.module.css'

    import { getProducts } from '../actions'
    import { useState } from 'react'
    import axios from 'axios'
    import Subscription from '../components/subscription'

    export default function Home({products}) {
      const [email, setEmail] = useState('');

      const inputChangeHandler = (event) => {
        const value = event.target.value
        setEmail(value)
      }

      const subscribeHandler = async () => {
        const subscriptionRes = await axios.post('http://localhost:3000/api/subscription', {email});
        alert(`${subscriptionRes.data.text}`);
        setEmail('');
      }

      return (
        <>
        <div className="container pt-5">
          <h1 className="text-center pb-3">Tea & Coffee shop</h1>

          {/* Products section starts */}
          <section>
            <div className="row">
              <Products products={products}/>
            </div>
          </section>
          {/* Products section ends */}

          {/* Subscribe section starts */}
          <section>
            <div className="row pb-5">
              <div className="col">
             <Subscription
             email={email}
             inputChangeHandler={inputChangeHandler}
             subscribeHandler={subscribeHandler}
              />
              </div>
            </div>
          </section>
          {/* Subscribe section ends */}

        </div>
        </>
      )
    }

    // use getStaticProps whenever possible, so the content is pre-rendered at build time.
    export async function getStaticProps(){
      const products = await getProducts();
      return {
        props: {
          products
        }
      }
    }

    // use getServerSideProps when data changes a lot and you need to get fresh content.
    // The content is pre-rendered on the server side upon the client's request.
    // This is a slower option. If you uncomment this, and comment getStaticProps, the app
    // should still work
    // export async function getServerSideProps(){
    //   const products = await getProducts();
    //   return {
    //     props: {
    //       products
    //     }
    //   }
    // }
    index.js

    // pages/api/subscription.js

    // when deployed, this is a serverles function, callable at BASE_URL/api/subscription
    export default function handler(req, res){
        //some code here to save the email to a database
        const email = req.body.email;
        return res.status(200).json({text: `${email} successfully subscribed`});
    }subscription.js

## Conclusion

When choosing how to consume data in a Next.js app, we are also deciding on the pre-rendering strategy, and the SSG approach is the default in Next.js, which brings the benefits of blazing-fast serving times and SEO, thanks to the possibility of static files being cached on a CDN (Content Delivery Network).

If you need some fresh data, you can keep using the SSG approach and fetch some data on the client (with useEffect or componentDidMount)

Alternatively, the fresh data can be fetched on the server-side at request time, following an SSR on-demand approach, and that is done thanks to JS running on a Node environment (server).

Finally, we can say that the focus of web apps on the server and client-side has reached maturity, and we can make hybrid apps that can satisfy the demands of the current times.

If you want to learn more about Next js and create your own applications, check the full course at [https://academy.eincode.com/next.js](https://academy.eincode.com/courses/complete-next-js-with-react-node-beautiful-portfolio-app)
