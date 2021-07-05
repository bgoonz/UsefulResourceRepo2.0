# Quick Win - Submitting data through Logic Apps from the web

**Produced by Dave Lusty**

# Introduction

This demo shows how you can use a simple HTML form stored in Blob storage to submit data and store it as JSON (or any other format) in Logic Apps. This is useful for when you need to collect a tiny piece of data that you don't currenlty have in a database. A great alternative would also be PowerApps, but this method is simple and many people already know HTML and possibly Javascript so this concept will be handy for your toolkit.
You can find the [video demo here](https://youtu.be/PGnwvwJKs4g)

# Website

For this demo we need a very simple website. When i say simple I mean a single HTML page with a single form on it. This will be used to submit our data which the Logic App will store to Blob Storage, or we could just as easily insert into Azure SQL DB or Cosmos DB with the same technique.

## HTML Content

Create an html file called formdata.html and copy the below code into it. Please note that the form action will be filled in later once we have the URL from Logic Apps. For now we'll leave it as it is though and upload for testing.

```HTML
<!DOCTYPE html>
<html>
  <head>
	  <title>Test Form</title>
  </head>
  <body>
    <form action="<LOGIC APP PATH GOES HERE>"  method="post">
      First name:<br>
      <input type="text" name="firstname"><br>
	    Last name:<br>
      <input type="text" name="lastname"><br>
	    Date:
      <input type="date" name="date">
	    <input type="submit" value="Submit">
    </form>
  </body>
</html>
```

## Storage Account

Create a Storage Account (yourname20190205) in a new Resource Group (FormsTest). Use LRS to keep costs down here.

![1.createstorage.png](images/1.createstorage.png)

Open the storage account andclick on Blobs in the menu. Here, create two containers. One called html which will house the website and have Blob permissions so we can access publicly.

![2.newcontainer1](images/2.newcontainer1.png)

The other will be called FormData and will be where we write the data to from the Logic App. This will be private since we don't want access to this data publicly.

![3.newcontainer2.png](images/3.newcontainer2.png)

You should now have the following:

![4.containers.png](images/4.containers.png)

Next, open html and upload your html file from earlier.

![5.uploadblob.png](images/5.uploadblob.png)

Now click on the file and copy the URL. You'll need this to access the page. Paste the URL into a browser and check you have the form available. It won't do anything yet since we've not made the Logic App.

![6.copyurl.png](images/6.copyurl.png)

# Logic App

Next we need to create a Logic App. Name this formdata and put it into the FormsTest Resource Group.

![7.createlogicapp.png](images/7.createlogicapp.png)

Once the Logic App is created, start a blank app. Add an HTTP Request trigger.

![8.httprequest.png](images/8.httprequest.png)

Leave defaults on this trigger

![9.httprequest2.png](images/9.httprequest2.png)

Next, add a Data Operations - Compose task.

![10.datacompose.png](images/10.datacompose.png)

In the input box, you'll need to end up with the following. You can use the dynamic content button to add in the values easily. These use the triggerFormDataValue() function of Logic Apps to get access to parameters passed in from the trigger. In this instance we can simply request each of the form elements easily using their label from the HTML form. Note that we've structured this as JSON but could just as easily have used CSV format or any other format that fits the requirement.

```
{
  "date": "@{triggerFormDataValue('date')}",
  "firstname": "@{triggerFormDataValue('firstname')}",
  "lastname": "@{triggerFormDataValue('lastname')}"
}
```

Finally, add a Create Blob task and set up a connection to the storage account. Then browse to the form data container. The content will be the output of the Compose task, which can be selected in the dynamic content popup. For the blob name we'll use the following which can be built using the dynamic content popup. The 'u' format gives a sortable date format which is useful for naming files.

```
@{formatDateTime(utcNow(),'u')}-@{triggerFormDataValue('lastname')}-@{triggerFormDataValue('firstname')}.json
```

![11.saveblob.png](images/11.saveblob.png)

Save the Logic App and you'll see a URL appear in the trigger. Copy this and paste it into the HTLM file to replace the placeholder.

![12.url.png](images/12.url.png)

Finally, upload the HTML file to blob again and overwrite the original version. You can now fill in the form and submit. This will create a file in your Blob storage with the JSON data inside.

![13.newfile.png](images/13.newfile.png)

This procedure can be modified for many scenarios to help ingest data.
