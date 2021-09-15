# Firebase Database Self-Serve Backup to BQ/CSV Exporter

This project takes a self-serve backup generated from the Firebase Realtime Database and outputs a flattened CSV as output.

The CSV is made to be uploaded to BigQuery but can be used for any number of purposes.

The term *flattened* is used to represent the following transformation

```json
{
    "a": true,
    "b": {
        "c": true
    }
}
```

will be converted to

```text
a,true
b,c,true
```

## Setup

This project was created and tested using Node v9.1.0.

Setup using: `npm install`

## Getting a Self-Serve Backup

To generate a self-serve backup:

1. Go to the Firebase console (`https://console.firebase.google.com/project/<YOUR_PROJECT>/database/backups`).
1. Click on a backup to download it from GCS. (or create a public link to it)

## Exporting to a CSV

Run this using: `node export.js --inputURL http://link/to/backup.gz --outputPath /tmp/output.gz`

### Arguments

#### `--inputURL http://path/to/input` OR `--inputPath /path/to/input`

**required**

This flag indicates where the input resides.

#### `--outputPath /path/to/output`

**required**

This flag indicates where the output csv should reside.

#### `--noCompressedInput`

*optional*

This flag takes no parameters. By default, it is expected that the input is gzipped. If it is not, use this flag to indicate as such.

#### `--noCompressedOutput`

*optional*

This flag takes no parameters. By default, it is expected that the output will be gzipped. If it should not, use this flag to indicate as such.

#### `--fillWithNulls`

*optional*

This flag takes no parameters. By default, the output will contain rows of mixed-width depending on how deep the input data is. By using this flag, the output will be normalized to contain 32 columns.

## Upload to BigQuery

1. Navigate to the [BigQuery console](https://bigquery.cloud.google.com).
1. Under the desired Data Set, click "Create new table".
1. Use the following params:
    1. Source Data: `Create from source`
    1. Location: `Google Cloud Storage`, set the path (e.g. `gs://my-bucket/output.gz`)
    1. File format: `CSV`
    1. Table name: `your-dataset`.`your-table`
    1. Schema: (If you used `--fillWithNulls`, you can set `Automatically detect`), otherwise click `Edit as Text` and input:
    ```c1:STRING,c2:STRING,c3:STRING,c4:STRING,c5:STRING,c6:STRING,c7:STRING,c8:STRING,c9:STRING,c10:STRING,c11:STRING,c12:STRING,c13:STRING,c14:STRING,c15:STRING,c16:STRING,c17:STRING,c18:STRING,c19:STRING,c20:STRING,c21:STRING,c22:STRING,c23:STRING,c24:STRING,c25:STRING,c26:STRING,c27:STRING,c28:STRING,c29:STRING,c30:STRING,c31:STRING,c32:STRING```
    1. Field delimiter: `Comma`
    1. Allow jagged rows: `Check` (ONLY if you didn't use `--fillWithNulls`)
1. Click `Create Table`.

*This is not an official Google product*
