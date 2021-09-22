# Online Store Project

A functioning fictitious online single malt whisky store called "Top Shelf Whisky", built with Node.js, Express, and MongoDB. Authentication by Passport.js and online payments made through [Stripe](https://stripe.com).<br>
To make a fake purchase, create a user account with fake information, and use the fake credit card number `4242424242424242`.<br>

You can check out the working application live by going [**here**](https://willjw3-topshelfwhisky-glitch.glitch.me/)<br>
Or,<br>
You can run this application on your local machine:

1. Download and install MongoDB if you don't have it installed on your machine already.
2. Navigate to the directory you want to add the project to.
3. Clone the repository

```
git clone https://github.com/willjw3/Online-Store-Project.git
```

4. Navigate into the project directory.

```
cd online-store-project
```

5. Make sure dependencies are installed.

```
npm install
```

6. Navigate into the 'seed' directory.

```
cd seed
```

7. Add the store products to the database.

```
node product-seeder.js
```

8. Go back to the project main directory.

```
cd ..
```

9. Run the application.

```
npm start
```

10. Open a tab in your web browser and use `localhost:3000`.
    Everything should be working now.
