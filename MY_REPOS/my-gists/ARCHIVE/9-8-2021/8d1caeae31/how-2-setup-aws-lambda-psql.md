|

|

Hey Bryan, it's Nate from [newline](https://fd338.infusion-links.com/api/v1/click/6626750413275136/5065786733756416) and today I'll show you how to create a PostgreSQL database for your AWS Lambda app. In this walkthrough, we configure the database so that it's covered by the AWS [Free Tier](https://fd338.infusion-links.com/api/v1/click/5815833194790912/5065786733756416), that way it won't cost anything.

This lesson is part of *The newline Guide to Serverless Django with Zappa*. Check out the [full course](https://fd338.infusion-links.com/api/v1/click/5173837925056512/5065786733756416) for more.

[![Creating an RDS Database](https://ci6.googleusercontent.com/proxy/CelabduVwxbC_KisebBZFQw1QNagrv6ChEMDyJfT3UThp4ye9KQ9fakGFG7jZOKjvDoCU3p7jQDNnZ1BcRzlOSRFQiQ782DHLuWLC4osT9DLUL_8PxLFYpY5ZAG8ZxhABoSBRQF_XkNXMFG-K18Tg-3ZH6lxWBKgv7LgZoHEbqeg3nKFJc8dP9Jg8cuFnoxY300V_3LFiOfPNQ=s0-d-e1-ft#http://email-assets.fullstack.io.s3-website-us-east-1.amazonaws.com/assets/zappa/2021-06-06-postgresql-database-lambda/aws_console.jpg)](https://fd338.infusion-links.com/api/v1/click/5425192912683008/5065786733756416)

AWS RDS supports many types of database engines, but for this lesson, we will choose a well-supported and common engine: [PostgreSQL](https://fd338.infusion-links.com/api/v1/click/5454475584471040/5065786733756416). Make sure your AWS account has the permissions to create new RDS instances.

This lesson is going to be used for illustration purposes. The RDS instance you will create will be publicly accessible to the entire internet. This insecure approach should not be used in production.

We're going through this process now to become familiar with the steps and will delete this database at the end. In the full course we go over more steps to make this setup production-ready.

Creating RDS Instances
----------------------

When you create an RDS instance, it's like telling AWS to host a virtual database server for you. You can host one or more databases on an RDS instance, so if you have many small projects that don't require many resources, they can all share a single RDS instance. This is nice if you'd like to continue to use the AWS free tier and keep your monthly costs low.

So we're going to create an RDS instance called `newline-course-zappa` and on that instance, we'll host a database called `ZappaCourseDB`.

Step by Step
------------

Here are the steps we're following to create the RDS instance. Not all the settings would be appropriate for creating a production RDS instance, and I've attempted to note them below.

1.  Go to the [RDS service](https://fd338.infusion-links.com/api/v1/click/6629172678361088/5065786733756416) in the AWS Console
2.  For database creation method, select `Standard create`
3.  For Engine options, select `PostgreSQL`

    -   For the Version, you may select the latest stable version. For this lesson, we'll use `PostgreSQL 12.5-R1`
4.  For Templates, select `Free tier`
5.  For Settings, use the following:

    -   For DB Instance Identifier, let's use `newline-course-zappa`. Of course, you may choose anything to identify your own RDS instance here.
    -   For Credentials Setting, you may use the default `postgres` as the username. For increased security, you may want to choose something else. Pick a strong password. **Make sure to record these securely**
6.  For DB Instance Class, `db.t2.micro` should already be selected for you (corresponds to the free tier)
7.  For Storage, you may take the defaults, but please disable `Storage autoscaling` unless you know you need this.
8.  For Availability and Durability, this section should be disabled due to the free tier restrictions.

    -   In production, you'll want to read up on how Multi-AZ will add robustness to your service. This is highly recommended.
9.  For Connectivity, we need to edit some options

    -   You may leave the default VPC and Subnet group settings.
    -   Public Access should be set to **yes**. This is the important switch. You normally wouldn't want to use this, but to keep things simple for this lesson, it's fine.
    -   Keep the default VPC Security Group
    -   Keep the Availability Zone at `no preference`
10. For Database Authentication, select `Password authentication`
11. Expand Additional Configuration. The initial database name should be `ZappaCourseDB`. Uncheck `Enable automatic backups` (won't be needed for this lesson, but valuable in production). Uncheck `Enable performance insights` (won't be needed for this lesson, but valuable in production). Keep defaults for Maintenance and Deletion protection. Obviously, when creating production RDS instances, you'll want to pay more attention to these.
12. Click on **Create Database**

Once completed, you'll see the new RDS instance in the console like this:

![RDS being created](https://ci4.googleusercontent.com/proxy/YEbv4R9srQQx384nbIaasWyR1rk8ssc492TjxhZjMBGZ00SwtZDX6fyuy2xduf5Q1wBgrxnnz5W2PEPEHSOvTKCH_o2YiyeWwinRFxYf8hiM1KFKLCyNJ-rLItJTwPdtegkNKd9j_S6-3eE1215Ch_oyiK1aPorYUoJooAHDqxPY25ThkQpL462lUNDsKuch1rWz1RqnNlBe4P1rhw=s0-d-e1-ft#http://email-assets.fullstack.io.s3-website-us-east-1.amazonaws.com/assets/zappa/2021-06-06-postgresql-database-lambda/0_rds_instance.jpg)

Edit Security Group Settings
----------------------------

Even though you've set this RDS instance to be public, we'll need to open up the security group to allow inbound database network traffic. Follow these steps:

1.  Click on the name of your RDS instance in the AWS Console
2.  Under Security, click on the name of your VPC security group. It should be something like `default (sg-fe7fa7f1)`. Note the name will be similar but the trailing characters after `sg-` will be different.
3.  Click on the In-bound rules tab
4.  Click on **Edit inbound rules**
5.  Scroll to the bottom and click on **Add rule**
6.  Configure the new rule with these settings:

    -   Type is **PostgreSQL**
    -   Source is **Anywhere**
7.  Then click **Save Rules**

Your final security group configuration should resemble the following.

![Security Group Config](https://ci5.googleusercontent.com/proxy/2RZD4Sfapi-I-y2OHUDztkWfvm78sYdmmXuwTiTxrBLpEa0Hu8rO4a4moLFK3oE2tyj-6g44rUZ1nC2t7TH89codjRFzRIOAfN3_SARSHF3coOsnkR6alRJait5L9jn1wi8W8EnH-_pIKWyI2wRY7HrIGFGAkADm-GLRoynrnLLeIwBv9avBTX2VNrlHrmgbXPqiCJtaFIHxS1vUZPGBMg=s0-d-e1-ft#http://email-assets.fullstack.io.s3-website-us-east-1.amazonaws.com/assets/zappa/2021-06-06-postgresql-database-lambda/security_settings.jpg)

Don't forget to test to see if you can connect to the database from your app. As a follow up to this simple set up, you'll want to configure security settings more robustly after your initial connection is successful. If you need more guidance, check out our new [course](https://fd338.infusion-links.com/api/v1/click/5459211188568064/5065786733756416) for running Django on AWS Lambda.

 |

 |