# Heroku Postgres - DevOps - Confluence

> Command:

<table data-number-column="false"><colgroup><col><col></colgroup><tbody><tr><th rowspan="1" colspan="1" colorname="" data-colwidth="124"><p data-renderer-start-pos="105"><strong data-renderer-mark="true">Command:</strong></p></th><td rowspan="1" colspan="1" colorname="" data-colwidth="636"><p data-renderer-start-pos="117"><span data-renderer-mark="true">heroku addons:create heroku-postgresql:&lt;PLAN_NAME&gt;</span></p></td></tr><tr><th rowspan="1" colspan="1" colorname="" data-colwidth="124"><p data-renderer-start-pos="173"><strong data-renderer-mark="true">Example:</strong></p></th><td rowspan="1" colspan="1" colorname="" data-colwidth="636"><p data-renderer-start-pos="185"><span data-renderer-mark="true">heroku addons:create heroku-postgresql:hobby-dev</span></p></td></tr><tr><th rowspan="1" colspan="1" colorname="" data-colwidth="124"><p data-renderer-start-pos="239"><strong data-renderer-mark="true">Response</strong></p></th><td rowspan="1" colspan="1" colorname="" data-colwidth="636"><div><p><span><code><span>1</span><span>Creating heroku-postgresql on ⬢ protected-crag-15098... free </span><span>2</span>Database has been created and is available <span>3</span> ! This database is empty. If upgrading, you can transfer <span>4</span> ! data from another database with pg:copy <span>5</span>Created postgresql-corrugated-24850 as DATABASE_URL <span>6</span>Use heroku addons:docs heroku-postgresql to view documentation</code></span></p></div></td></tr></tbody></table>

Notes:

1.  <PLAN\_NAME> may be omitted and will default to hobby-dev.
    
2.  You can specify the version of Postgres you want to provision by including the \--version flag.
    
3.  Check status of your database with blocking heroku pg:wait command
    

Check database URL:

<table data-number-column="false"><colgroup><col><col></colgroup><tbody><tr><th rowspan="1" colspan="1" colorname="" data-colwidth="124"><p data-renderer-start-pos="838"><strong data-renderer-mark="true">Command:</strong></p></th><td rowspan="1" colspan="1" colorname="" data-colwidth="636"><p data-renderer-start-pos="850"><span data-renderer-mark="true">heroku config</span></p></td></tr><tr><th rowspan="1" colspan="1" colorname="" data-colwidth="124"><p data-renderer-start-pos="869"><strong data-renderer-mark="true">Response:</strong></p></th><td rowspan="1" colspan="1" colorname="" data-colwidth="636"><p data-renderer-start-pos="882"><span data-renderer-mark="true">=== protected-crag-15098 Config Vars</span><br><span data-renderer-mark="true">DATABASE_URL: postgres://fpncofrnibemrl:2cc063e9fc9e013e8f5239d7cd3758a8f4fd66fba15c7117e5fcdfa33d4456d5@ec2-54-237-143-127.compute-1.amazonaws.com:5432/d3h9egc1elkjra</span></p></td></tr><tr><th rowspan="1" colspan="1" colorname="" data-colwidth="124"><p data-renderer-start-pos="1092"><strong data-renderer-mark="true">Command:</strong></p></th><td rowspan="1" colspan="1" colorname="" data-colwidth="636"><p data-renderer-start-pos="1104"><span data-renderer-mark="true">heroku pg</span></p></td></tr><tr><th rowspan="1" colspan="1" colorname="" data-colwidth="124"><p data-renderer-start-pos="1119"><strong data-renderer-mark="true">Response:</strong></p></th><td rowspan="1" colspan="1" colorname="" data-colwidth="636"><div><p><span><code><span>1</span><span>=== DATABASE_URL </span><span>2</span>Plan: Hobby-dev <span>3</span>Status: Available <span>4</span>Connections: 0/20 <span>5</span>PG Version: 13.1 <span>6</span>Created: 2021-02-20 16:01 UTC <span>7</span>Data Size: 7.9 MB <span>8</span>Tables: 0 <span>9</span>Rows: 0/10000 (In compliance) <span>10</span>Fork/Follow: Unsupported <span>11</span>Rollback: Unsupported <span>12</span>Continuous Protection: Off <span>13</span>Add-on: postgresql-corrugated-24850</code></span></p></div></td></tr></tbody></table>

![](blob:https://nickguner.atlassian.net/0a451ee2-4904-42e1-99b3-f004767da2a1#media-blob-url=true&id=6fdebf28-dab7-4555-9550-3449490fbb64&collection=contentId-1220673798&contextId=1220673798&mimeType=image%2Fpng&name=image-20210220-160925.png&size=67090&width=1343&height=480)

<table data-number-column="false"><colgroup><col><col></colgroup><tbody><tr><th rowspan="1" colspan="1" colorname="" data-colwidth="112"><p data-renderer-start-pos="1684"><strong data-renderer-mark="true">Command:</strong></p></th><td rowspan="1" colspan="1" colorname="" data-colwidth="646"><p data-renderer-start-pos="1696"><span data-renderer-mark="true">heroku addons</span></p></td></tr><tr><th rowspan="1" colspan="1" colorname="" data-colwidth="112"><p data-renderer-start-pos="1715"><strong data-renderer-mark="true">Response:</strong></p></th><td rowspan="1" colspan="1" colorname="" data-colwidth="646"><div><p><span><code><span>1</span><span>Add-on Plan Price State </span><span>2</span>─────────────────────────────────────────────── ───────── ───── ─────── <span>3</span>heroku-postgresql (postgresql-corrugated-24850) hobby-dev free created <span>4</span> └─ as DATABASE</code></span></p></div></td></tr></tbody></table>

Assuming following credentials:

<table data-number-column="false"><colgroup><col><col></colgroup><tbody><tr><th rowspan="1" colspan="1" colorname="" data-colwidth="153"><p data-renderer-start-pos="2132"><strong data-renderer-mark="true">UID:</strong></p></th><td rowspan="1" colspan="1" colorname="" data-colwidth="605"><p data-renderer-start-pos="2140"><span data-renderer-mark="true">nick</span></p></td></tr><tr><th rowspan="1" colspan="1" colorname="" data-colwidth="153"><p data-renderer-start-pos="2150"><strong data-renderer-mark="true">PWD:</strong></p></th><td rowspan="1" colspan="1" colorname="" data-colwidth="605"><p data-renderer-start-pos="2158"><span data-renderer-mark="true">nick</span></p></td></tr><tr><th rowspan="1" colspan="1" colorname="" data-colwidth="153"><p data-renderer-start-pos="2168"><strong data-renderer-mark="true">Database Name:</strong></p></th><td rowspan="1" colspan="1" colorname="" data-colwidth="605"><p data-renderer-start-pos="2186"><span data-renderer-mark="true">profit</span></p></td></tr></tbody></table>

Export your local database to a file
------------------------------------

<table data-number-column="false"><colgroup><col><col></colgroup><tbody><tr><th rowspan="1" colspan="1" colorname="" data-colwidth="142"><p data-renderer-start-pos="2238"><strong data-renderer-mark="true">Commands:</strong></p></th><td rowspan="1" colspan="1" colorname="" data-colwidth="616"><div><p><span><code><span>1</span><span>set PGPASSWORD=nick</span></code></span></p></div><div><p><span><code><span>1</span><span>pg_dump -Fc --no-acl --no-owner -h localhost -U nick profit &gt; mydb.dump</span></code></span></p></div></td></tr></tbody></table>

Note:

1.  File mydb.dump created in the project root directory
    

Import to Heroku Postgres
-------------------------

In order for PG Backups to access and import your dump file you will need to upload it somewhere with an HTTP-accessible URL. 

### Using AWS S3 to Store Static Assets and File Uploads

S3 allows you to offload the storage of static files from your app. This is crucial on Heroku, because your app’s dynos have an [ephemeral filesystem](https://devcenter.heroku.com/articles/dynos#ephemeral-filesystem "https://devcenter.heroku.com/articles/dynos#ephemeral-filesystem"). This means that all files that aren’t part of your application’s slug are **lost** whenever a dyno restarts or is replaced (this happens at least once daily).

Access to the S3 API is governed by an **Access Key ID** and a **Secret Access Key**. The access key identifies your S3 user account, and the secret key is a password-like credential that should be stored securely. See [https://nickguner.atlassian.net/wiki/spaces/DEV/pages/1220575532/Batch+upload+files+to+the+cloud#Install-and-Configure-the-AWS-CLI](https://nickguner.atlassian.net/wiki/spaces/DEV/pages/1220575532/Batch+upload+files+to+the+cloud#Install-and-Configure-the-AWS-CLI)

#### S3 Setup

Enabling an application to use S3 requires that the application have access to the AWS credentials as well as the name of the bucket to store files.

See [https://nickguner.atlassian.net/wiki/spaces/DEV/pages/1220575532/Batch+upload+files+to+the+cloud#Using-the-AWS-CLI-with-Amazon-S3](https://nickguner.atlassian.net/wiki/spaces/DEV/pages/1220575532/Batch+upload+files+to+the+cloud#Using-the-AWS-CLI-with-Amazon-S3)

<table data-number-column="false"><colgroup><col><col></colgroup><tbody><tr><th rowspan="1" colspan="1" colorname="" data-colwidth="167"><p data-renderer-start-pos="3370"><strong data-renderer-mark="true">Operation</strong></p><figure><div><figure></figure></div></figure></th><th rowspan="1" colspan="1" colorname="" data-colwidth="591"><p data-renderer-start-pos="3383"><strong data-renderer-mark="true">Command</strong></p><figure><div><figure></figure></div></figure></th></tr><tr><td rowspan="1" colspan="1" colorname="" data-colwidth="167"><p data-renderer-start-pos="3396">Create a new bucket</p></td><td rowspan="1" colspan="1" colorname="" data-colwidth="591"><p data-renderer-start-pos="3419"><span data-renderer-mark="true">aws s3 mb s3://nickg-heroku</span></p></td></tr><tr><td rowspan="1" colspan="1" colorname="" data-colwidth="167"><p data-renderer-start-pos="3452">Upload the file</p></td><td rowspan="1" colspan="1" colorname="" data-colwidth="591"><p data-renderer-start-pos="3471"><span data-renderer-mark="true">aws s3 cp ./mydb.dump s3://nickg-heroku/</span></p></td></tr><tr><td rowspan="1" colspan="1" colorname="" data-colwidth="167"><p data-renderer-start-pos="3517">Generate a signed URL</p></td><td rowspan="1" colspan="1" colorname="" data-colwidth="591"><p data-renderer-start-pos="3542">Command</p><div><p><span><code><span>1</span><span>aws s3 presign s3://nickg-heroku/mydb.dump</span></code></span></p></div><p data-renderer-start-pos="3595">Response:</p><div><p><span><code><span>1</span><span>https://nickg-heroku.s3.amazonaws.com/mydb.dump?AWSAccessKeyId=AKIAS4YHT5YA4SIQKXZP&amp;Expires=1613850105&amp;Signature=h7dINe3i%2FuBkNT8mWG0vZCzyapI%3D</span></code></span></p></div></td></tr><tr><td rowspan="1" colspan="1" colorname="" data-colwidth="167"><p data-renderer-start-pos="3757">Use the raw file URL in the&nbsp;<span data-renderer-mark="true">pg:backups restore</span></p></td><td rowspan="1" colspan="1" colorname="" data-colwidth="591"><p data-renderer-start-pos="3807">Command:</p><div><p><span><code><span>1</span><span>heroku pg:backups:restore "https://nickg-heroku.s3.amazonaws.com/mydb.dump?AWSAccessKeyId=AKIAS4YHT5YA4SIQKXZP&amp;Expires=1613850105&amp;Signature=h7dINe3i%2FuBkNT8mWG0vZCzyapI%3D" DATABASE_URL</span></code></span></p></div><p data-renderer-start-pos="4005">Response:</p><div><p><span><code><span>1</span><span>Restoring... done</span></code></span></p></div></td></tr><tr><td rowspan="1" colspan="1" colorname="" data-colwidth="167"><p data-renderer-start-pos="4039">Execute <span data-renderer-mark="true">psql </span>commands</p></td><td rowspan="1" colspan="1" colorname="" data-colwidth="591"><p data-renderer-start-pos="4064"><span data-renderer-mark="true">heroku pg:psql</span></p></td></tr></tbody></table>

Notes:

1.  For Windows use double quotes in pg:buckups restore around the URL, for Linux use single quotes.
    

Delete the object from the bucket

View Database in the Dashboard
------------------------------

View Data in Heroku Database
----------------------------

You may use heroku pg:psql command to view tables in your database but you would not me able to examine the actual data.

Use Heroku Dashboard to view database credentials. Click on “Settings", and **View Credentials**

Use values to create Squirrel Configuration:

### Squirrel Configuration

<table data-number-column="false"><colgroup><col><col></colgroup><tbody><tr><th rowspan="1" colspan="1" colorname="" data-colwidth="137"><p data-renderer-start-pos="4849"><strong data-renderer-mark="true">Name:</strong></p></th><td rowspan="1" colspan="1" colorname="" data-colwidth="621"><p data-renderer-start-pos="4858">Heroku</p></td></tr><tr><th rowspan="1" colspan="1" colorname="" data-colwidth="137"><p data-renderer-start-pos="4870"><strong data-renderer-mark="true">URL:</strong></p></th><td rowspan="1" colspan="1" colorname="" data-colwidth="621"><p data-renderer-start-pos="4878"><span data-renderer-mark="true">jdbc:postgresql://ec2-54-237-143-127.compute-1.amazonaws.com/d3h9egc1elkjra</span></p></td></tr><tr><th rowspan="1" colspan="1" colorname="" data-colwidth="137"><p data-renderer-start-pos="4959"><strong data-renderer-mark="true">User Name:</strong></p></th><td rowspan="1" colspan="1" colorname="" data-colwidth="621"><p data-renderer-start-pos="4973"><span data-renderer-mark="true">fpncofrnibemrl</span></p></td></tr><tr><th rowspan="1" colspan="1" colorname="" data-colwidth="137"><p data-renderer-start-pos="4993"><strong data-renderer-mark="true">Password:</strong></p></th><td rowspan="1" colspan="1" colorname="" data-colwidth="621"><p data-renderer-start-pos="5006"><span data-renderer-mark="true">2cc063e9fc9e013e8f5239d7cd3758a8f4fd66fba15c7117e5fcdfa33d4456d5</span></p></td></tr></tbody></table>

<table data-number-column="false"><colgroup><col><col></colgroup><tbody><tr><th rowspan="1" colspan="1" colorname="" data-colwidth="137"><p data-renderer-start-pos="5078"><strong data-renderer-mark="true">Query</strong></p></th><td rowspan="1" colspan="1" colorname="" data-colwidth="621"><div><p><span><code><span>1</span><span>select id, project_name, project_description from project</span></code></span></p></div></td></tr><tr><th rowspan="1" colspan="1" colorname="" data-colwidth="137"><p data-renderer-start-pos="5150"><strong data-renderer-mark="true">Response</strong></p></th><td rowspan="1" colspan="1" colorname="" data-colwidth="621"><div><p><span><code><span>1</span><span> id project_name project_description </span><span>2</span>--- ------------ ------------------- <span>3</span> 1 P-1 Project one <span>4</span> 2 P-2 Project two <span>5</span> 3 P-3 Project three <span>6</span> 4 P-4 Project four <span>7</span>101 P-X Project X <span>8</span>102 P-A Project A</code></span></p></div></td></tr></tbody></table>

Be the first to like this


[Source](https://nickguner.atlassian.net/wiki/spaces/DEV/pages/1220673798/Heroku+Postgres)
