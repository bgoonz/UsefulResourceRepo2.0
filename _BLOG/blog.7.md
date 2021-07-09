[![VithalReddy](https://miro.medium.com/fit/c/96/96/1*GlQSX_dAtVf7agV94PlmgA.jpeg)](https://medium.com/@vithalreddy?source=post_page-----b0acd3a4b712--------------------------------)

![](https://miro.medium.com/max/1300/1*FiLjV7Xs4RH616P7GFJOSw.jpeg)

MongoDB windows service

Today we will learn How to Setup and run **MongoDB windows service** continuing our [MongoDB Development Tutorials](https://stackfame.com/mongodb) series. MongoDB king of NoSQL databases, check out [Introduction to MEAN Stack article](https://stackfame.com/introduction-mean-stack-development) to know why. In this article, You will learn to Setup, config, start and run MongoDB As a Service in Windows PC to be precise Windows 10 64bit and 32 bit, Windows 7 64bit and 32 bit.

If you haven’t installed MongoDB on your Windows Pc please Go to the [Official website](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#) of MongoDB and download the latest setup file 32bit or 64 bit according to your pc architecture.Now let’s start how we can install mongodb windows service.

> _When you’re installing MongoDB, please select_ **_c:/mongodb_** _as directory for easier access and future uses_

Before installing mongodb windows service, we will **set up MongoDB environment** as follows:

MongoDB required Directory to store all database to set that directory Create **Data** folder inside **c:/mongodb** or you can specify any folder of your choice and preference or MongoDB will use \\data\\db inside your MongoDB Installation.

![](https://miro.medium.com/max/1400/1*yaaKuqzmgC0glqMnXq-zQw.png)

To start MongoDB, run **mongod.exe** from the **Command Prompt** navigate to your MongoDB Bin folder and run **mongod** command, it will start MongoDB main process and _The waiting for connections message_ in the console.

![](https://miro.medium.com/max/1400/1*7MfTwwIOE3zThXtug3EUMw.png)

If you want to connect mongodb through shell, use below commands

![](https://miro.medium.com/max/1400/1*G4-ZNkUYCuynRbS70K4Gig.png)
