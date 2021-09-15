# S3 Static Sites

What this will cover

- Host a static website at S3
- Redirect `www.website.com` to `website.com`
- Website can be an SPA (requiring all requests to return `index.html`)
- Free AWS SSL certs
- Deployment with CDN invalidation

## Resources

- https://stormpath.com/blog/ultimate-guide-deploying-static-site-aws
- https://miketabor.com/host-static-website-using-aws-s3/
- http://www.mycowsworld.com/blog/2013/07/29/setting-up-a-godaddy-domain-name-with-amazon-web-services.html
- https://www.davidbaumgold.com/tutorials/host-static-site-aws-s3-cloudfront/#make-an-s3-bucket

## S3 Bucket

- Create an S3 bucket named exactly after the domain name, for example `website.com`.
- In **Properties**, click the Static Website section.
  - Click **Use this bucket to host a website** and enter `index.html` into **Index Document** field.
  - Don't enter anything else in this form.
  - This will create an "endpoint" on the same screen similar to `http://website.com.s3-website-us-east-1.amazonaws.com`.
- Then click on **Permissions** tab, then **Bucket Policy**. Enter this policy:

```json
{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Sid": "AllowPublicRead",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::BUCKET_NAME/*"
    }
  ]
}
```

> Be sure to replace `BUCKET_NAME` with yours.

> Note: Naming the bucket doesn't have to be exactly the domain name. I read that in several articles that it needed to be, but it doesn't. If using wildcard domains with AWS, I've read that we can't have dots in the domain name when using wildcard domains. So just know that you can name the bucket whatever, but using dots does work if not using wildcard domains

Uploading an `index.html` should allow us to visit the "endpoint"

## CloudFront

- Go to the CloudFront section and click **Create Distribution** and then create for **Web**, not RTMP.
- In **Origin Domain Name**, paste the "endpoint" previously created in S3 (without the `http://` part). Note that when you click on this field it will act like a dropdown with options to your existing buckets. I think you can just select one of those two which is a valid list of your S3 buckets.
- The order of these instructions assume SSL certificates are not setup yet. So don't do anything with settings regarding SSL
- Select "yes" for **Compress Objects Automatically**.
- In **Alternate Domain Names (CNAMEs)**, put the domain names which you want to correspond to this bucket. Put each on their own line **OR** separated by comma. The reason why you may have two or more is something like this: `mywebsite.com` and `www.mywebsite.com`. The field is called "Alternative Domain Names" because AWS will have an aws-specific domain name for the CDN, but you don't want to use that so you'll want to put in your custom domains and then use Route 53 (next section) to point domains to the CDN.
- In **Default Root Object**, type `index.html`.
- Create. The next screen will show distributions in table form, the one we just made will be "in progress" for a few minutes

The distribution will have a domain name like `dpo155j0y52ps.cloudfront.net`. This is important for DNS (see below). So copy it somehwere.

## Route 53

These DNS instructions assume your DNS is hosted at AWS. **This does not mean** you have to buy a domain at AWS, it just means that when you buy a domain at somewhere like Google or GoDaddy, over there you need to point NS records to AWS to allow AWS to manage the parts of the DNS record. But first, at AWS is where you create the "Hosted Zone" which is where you create the NS values to eventually give to Google or GoDaddy, etc. I don't know how any of this is different if you buy your domain at AWS (But then again I never buy domains at the same place I host)

- Click **Hosted Zones**
- Create a new Zone: Use the domain name (`mywebsite.com` without sub domain) for zone. Note that each domain name will get one zone, sub domains all belong to the same zone.
- This should create NS records such as:

```
ns-1208.awsdns-23.org.
ns-2016.awsdns-60.co.uk.
ns-642.awsdns-16.net.
ns-243.awsdns-30.com.
```

- The NS records can be used to point DNS management from other domain registrar to AWS Route 53
- Click **Create Record Set** to create an `A` record.
  - This will be the record that points `mywebsite.com` to CloudFront.
  - For the **name**, enter no value
  - Change **Alias** to Yes
  - Paste the CloutFront domain in the **Alias** field
    - This should look like `[some-random-number].couldfront.net`. You can get this by clicking your CloudFront distribution and in the General tab there is a "Domain Name" label.
  - Click Create Record Set
- Create another `A` record for the `www` redirect
  - Follow the same steps for the previous `A` record, but enter `www` for **name** and use the same CloudFront domain. But note this is because we want `www.mywebsite.com` and `mywebsite.com` to point to the same bucket (and therefore the same CloudFront domain). I suppose you would make a whole new bucket and a whole new CloudFront distrubution (with a new CF domain) if you wanted a second project at `app.mywebsite.com`. This might be common if you app is a React app that is completly separate code from your "home page" website which might be from a static site generator or something.

## HTTPS

In the AWS Console, go to **Certificate Manager** and request a cert for domain and all sub domains. We will be required to verify certificate via email or DNS. If verifying by email, AWS will look up the public DNS owner information and use up to three emails it finds there (if your domain ownership info is public). But even if it's not public, AWS will also use these (that you don't get to choose from)

- `administrator@mywebsite.com`
- `hostmaster@mywebsite.com`
- `postmaster@mywebsite.com`
- `webmaster@mywebsite.com`
- `admin@mywebsite.com`

If your company uses "webmaster@", hats off to you, because your app is probably 1000 years old.

**For .io TLDs**: http://docs.aws.amazon.com/acm/latest/userguide/troubleshoot-iodomains.html

If you choose to verify via DNS, AWS will ask you to add some CNAME records to your Route 53 DNS, but the nice thing is that there is a shortcut button to do so (for each domain and sub domain) from within the Certificate Manager section.

After the verification is done and the cert is "issued", we can go back into CloudFont to edit our distribution for this domain:

- Click the distribution and on the next page (in the General tab), click **Edit**
- Check the box for **Custom SSL Certificate**
- Select our cert and save. Note that what looks like a text field is really a dropdown menu once you click it to choose your certificate
- When done with the form, click the **Behaviors** tab and edit the only record that should be there
- Select **Redirect HTTP to HTTPS**. Click Save

## SPA

If the website is an SPA, then we need to make sure all requests to the server (S3 in this case) return something even if no file exists. This is becuase SPAs like React (with React Router) need the `index.html` page for every requests, then things like "not found" pages are handled in the front-end.

Go to CloudFront and click the distribution you want to apply these SPA settings to. Click the **Error Pages** tab and add a new error page. Fill the form with these fields:

- **HTTP Error Code**: 404
- **TTL**: 0
- **Custom Error Response**: Yes
- **Response Page Path**: `/index.html`
- **HTTP Response Code**: 200

## Deployment

For deployment, we need to consider that files in the CloudFront CDN are not meant to change. If we were to upload new files to S3, they would not be deployed to the CDN's edge servers and therefore would not update the website. [Read More](http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/ReplacingObjectsSameName.html).

To invalidate files on the CDN we'll need to use CloudFront's **invalidations** feature: [Read More](http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html).

In the AWS console, in the CloudFront management of a distribution, there is a tab for **Invalidations**. We could manually create an invalidation (with the value of `/*`) to invalidate all S3 files. Note that invalidation records here are one-time invalidations and every time we deploy new files, we will need to make a new invalidation.

To deploy with invalidations, we will need to [install AWS-CLI](https://aws.amazon.com/cli/) first. We also assume you have an IAM user from AWS with an Access Key and Secret Access Key.

To test installation, do:

```sh
aws --version
```

Configure aws-cli:

```sh
aws configure --profile PICK_A_PROFILE_NAME
```

> Note that using "profiles" to configure AWS-CLI is probably best since you might want to use the CLI to manage multiple AWS accounts at some point. Be sure to swap out `PICK_A_PROFILE_NAME` for your name choice (can be anything).

Enter these values:

```
AWS Access Key ID [None]: [Your Access Key]
AWS Secret Access Key [None]: [Your Secret Access Key]
Default region name [None]: us-east-1
Default output format [None]: json
```

This will save your entries at `~/.aws/credentials`. Note that you need to enter your correct region for your AWS stuff. I used `us-east-1`, but make sure to use the correct one for you. Also note that you can have responses in `text` instead of `json` if you want

You can ommit the last two questions for region and format if you want to set up a default for your computer (that all profiles will use). The default profile is located at `~/.aws/config`. If you omit the region and format from your profile, be sure they exist in your `~/.aws/config` as:

```sh
[default]
output = json
region = us-east-1
```

Now, since we'll need to do some CloudFront commands which are "experimental", we need to do:

```sh
aws configure set preview.cloudfront true
```

This will result in more records at `~/.aws/config`.

We should be setup now to dest a deployment. Run:

```sh
aws s3 sync --acl public-read --profile YOUR_PROFILE_NAME --delete build/ s3://BUCKET_NAME
```

- Obviously replace `YOUR_PROFILE_NAME` and `BUCKET_NAME` with yours. Also this assumes the folder you want to upload is `build`.
- This command will
  - Ensure all new files uploaded are public (`--acl public-read`)
  - Ensure we're using your credentials from your local AWS profile (`--profile YOUR_PROFILE_NAME`)
  - Remove any existing S3 objects that don't exist locally (`--delete`)

After deployment is verified and successful, we need to invalidate:

```sh
aws cloudfront --profile YOUR_PROFILE_NAME create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths '/*'
```

- Obviously replace `YOUR_PROFILE_NAME` and `YOUR_DISTRIBUTION_ID` with yours. Note that your Distribution ID can be found in the CloudFront seciton of AWS console.
- If the invalidation worked, you'll be able to see a record of it in the **Invalidations** tab after clicking on your distribution.

To make it all easier, add to `package.json`:

```json
  "scripts": {
    "deploy": "aws s3 sync --acl public-read --profile XYZ --delete build/ s3://XYX && npm run invalidate",
    "invalidate": "aws cloudfront --profile XYZ create-invalidation --distribution-id XYZ --paths '/*'"
  },
```

`XYZ` is for all the parts that need to be replaced. Now you can run `npm run deploy` which will deploy then invalidate

Cheers!
