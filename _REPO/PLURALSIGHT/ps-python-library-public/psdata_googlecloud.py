#!/usr/bin/env python
import httplib2
import pprint
import sys
import time

from apiclient.discovery import build
from apiclient.errors import HttpError
#from oauth2client.client import SignedJwtAssertionCredentials
from oauth2client.service_account import ServiceAccountCredentials
from oauth2client.client import AccessTokenRefreshError

import logging
logging.basicConfig() #included to avoid message when oauth2client tries to write to log

# some of this code built on this project: https://code.google.com/p/google-bigquery-tools/source/browse/samples/python/appengine-bq-join
# some of this code comes from the following link: https://developers.google.com/bigquery/bigquery-api-quickstart
# to build the service object follow setps in the service account section here: https://developers.google.com/bigquery/docs/authorization#service-accounts
# for more on the API... https://developers.google.com/resources/api-libraries/documentation/bigquery/v2/python/latest/

# Number of bytes to send/receive in each request.
CHUNKSIZE = 16 * (256 * 1024) #must be multiple of 256KB which is the calc in parenthesis
#old setting CHUNKSIZE = 2 * 1024 * 1024
# Retry transport and file IO errors.
RETRYABLE_ERRORS = (httplib2.HttpLib2Error, IOError)
# Mimetype to use if one can't be guessed from the file extension.
DEFAULT_MIMETYPE = 'application/octet-stream'
# Number of times to retry operations that are configured to allow retries
NUM_RETRIES = 2

def gcloud_connect(service_account, client_secret_file, scope):
    """Create authenticated token for Google Cloud

        Args:
            service_account: service account email address, should be formatted like 5555555-bfeh64gdfg8xxxxxxxxxx@developer.gserviceaccount.com 
            client_secret_file: local path to the .p12 file downloaded from your project's Credentials page
            scope: string indicating the google cloud scope, such as 'https://www.googleapis.com/auth/bigquery'

        Returns:
            Authorized HTTP object, result of running SignedJwtAssertionCredentials.authorize() 
    """
    with open(client_secret_file, 'rb') as f:
        #f = file(client_secret_file, 'rb')
        key = f.read()

    credentials = ServiceAccountCredentials.from_p12_keyfile(
        service_account,
        client_secret_file,
        scopes=scope)

    http = httplib2.Http()
    http = credentials.authorize(http)

    return http


def query_table(service, project_id,query):
    """ Run a query against Google BigQuery.  Returns a list with the results.
    
    Args:
        service: BigQuery service object that is authenticated.  Example: service = build('bigquery','v2', http=http)
        project_id: string, Name of google project which you want to query.
        query: string, Query to excecute on BigQuery.  Example: 'Select max(Date) from dataset.table'
    
    Returns:
        A list with the query results (excluding column names)
     """
    jobCollection = service.jobs()

    try:
        query_body = {"query": query}
        query_result = jobCollection.query(projectId=project_id,body=query_body).execute()

        result_list=[]
        for row in query_result['rows']:
            result_row=[]
            for field in row['f']:
                result_row.append(field['v'])
            result_list.append(result_row)

        return result_list

    except HttpError as err:
        print 'Error:', pprint.pprint(err.content)

    except AccessTokenRefreshError:
        print ("Credentials have been revoked or expired, please re-run"
               "the application to re-authorize")

    except KeyError:
        print "Key Error - no results" 


def cloudstorage_upload(service, project_id, bucket, source_file,dest_file, show_status_messages=True):
    """Upload a local file to a Cloud Storage bucket.

    Args:
        service: BigQuery service object that is authenticated.  Example: service = build('bigquery','v2', http=http)
        project_id: string, Name of Google project to upload to
        bucket: string, Name of Cloud Storage bucket (exclude the "gs://" prefix)
        source_file: string, Path to the local file to upload
        dest_file: string, Name to give the file on Cloud Storage

    Returns:
        Response of the upload in a JSON format
    """
    #Starting code for this function is a combination from these sources:
    #   https://code.google.com/p/google-cloud-platform-samples/source/browse/file-transfer-json/chunked_transfer.py?repo=storage
    #   https://developers.google.com/api-client-library/python/guide/media_upload
    from apiclient.http import MediaFileUpload

    filename = source_file
    bucket_name = bucket
    object_name = dest_file
    assert bucket_name and object_name

    if show_status_messages:
        print('Upload request for {0}'.format(source_file))
    media = MediaFileUpload(filename, chunksize=CHUNKSIZE, resumable=True)
    if not media.mimetype():
        media = MediaFileUpload(filename, DEFAULT_MIMETYPE, resumable=True)
    request = service.objects().insert(bucket=bucket_name, name=object_name,
                                     media_body=media)

    response = request.execute()

    if show_status_messages:
        print('Upload complete')

    return response


def cloudstorage_download(service, project_id, bucket, source_file, dest_file, show_status_messages=True):
    """Download a file from a Cloud Storage bucket to a local file.

    Args:
        service: BigQuery service object that is authenticated.  Example: service = build('bigquery','v2', http=http)
        project_id: string, Name of Google project to download from
        bucket: string, Name of Cloud Storage bucket (exclude the "gs://" prefix)
        source_file: string, Path to the file to download on Cloud Storage
        dest_file: string, Name to give the downloaded file

    Returns:
        None
    """
    #Starting code for this function is a combination from these sources:
    #   https://code.google.com/p/google-cloud-platform-samples/source/browse/file-transfer-json/chunked_transfer.py?repo=storage
    from apiclient.http import MediaIoBaseDownload

    filename = dest_file
    bucket_name = bucket
    object_name = source_file
    assert bucket_name and object_name

    if show_status_messages:
        print('Download request for {0}'.format(source_file))
    #media = MediaFileUpload(filename, chunksize=CHUNKSIZE, resumable=True)
    #if not media.mimetype():
    #    media = MediaFileUpload(filename, DEFAULT_MIMETYPE, resumable=True)
    f = file(filename, 'w')
    request = service.objects().get_media(bucket=bucket_name, object=object_name)
    #response = request.execute()
    media = MediaIoBaseDownload(f, request, chunksize=CHUNKSIZE)

    progressless_iters = 0
    done = False
    while not done:
        error = None
        try:
            p, done = media.next_chunk()
        except HttpError, err:
            error = err
            if err.resp.status < 500:
                raise
        except RETRYABLE_ERRORS, err:
            error = err

        if error:
            progressless_iters += 1
            #handle_progressless_iter(error, progressless_iters)
            if progressless_iters > NUM_RETRIES:
                if show_status_messages:
                    print('Failed to make progress for too many consecutive iterations.')
                raise error
            sleeptime = random.random() * (2**progressless_iters)
            if show_status_messages:
                print ('Caught exception (%s). Sleeping for %s seconds before retry #%d.'
                        % (str(error), sleeptime, progressless_iters))
            time.sleep(sleeptime)
        else:
            progressless_iters = 0

    if show_status_messages:
        print('Download complete')


def cloudstorage_delete(service, project_id, bucket, filename, show_status_messages=True):
    """Delete file from a Cloud Storage bucket.

    Args:
        service: BigQuery service object that is authenticated.  Example: service = build('bigquery','v2', http=http)
        project_id: string, Name of Google project
        bucket: string, Name of Cloud Storage bucket (exclude the "gs://" prefix)
        file: string, Path to the file to delete on Cloud Storage

    Returns:
        None
    """

    bucket_name = bucket
    object_name = filename
    
    if show_status_messages:
        print('Delete request for {0}/{1}'.format(bucket_name,object_name))

    obj = service.objects()
    result = obj.delete(bucket = bucket_name, object = object_name).execute()

    #if show_status_messages:
        #print result
        #print('{0}/{1} deleted'.format(bucket_name,object_name))


def gsutil_download(service,source_path,source_file, dest_path, parallel=True):
    """Download file(s) from Google Cloud Storage using gsutil command (must be installed on machine)
        Args:
            service: BigQuery service object that is authenticated.  Example: service = build('bigquery','v2', http=http)
            source_file: string, Path to the file to download (include * as wildcard for multiple files)
            dest_path: string, Name or path for the downloaded file(s)
            parallel: True (default) to run multiple file download in parallel

        Returns:
            None
    """
    from subprocess import call
    #strftime("%Y_%m_%d")
    if parallel:
        parallel_param = '-m'
    else:
        parallel_param = ''
    call(["gsutil", parallel_param, "cp", source_path + source_file, dest_path])


def gsutil_delete(service, path, parallel=True):
    """Delete file(s) from Google Cloud Storage using gsutil command (must be installed on machine)
        Args:
            service: BigQuery service object that is authenticated.  Example: service = build('bigquery','v2', http=http)
            path: string, Name for the file(s) to delete (* as wildcard for multiple files)
            parallel: True (default) to run multiple file delete in parallel

        Returns:
            None
    """
    from subprocess import call
    #strftime("%Y_%m_%d")
    if parallel:
        parallel_param = '-m'
    else:
        parallel_param = ''
    call(["gsutil", parallel_param, "rm", path])

def delete_table(service, project_id,dataset_id,table):
    """Delete a BigQuery table.

    Args:
        service: BigQuery service object that is authenticated.  Example: service = build('bigquery','v2', http=http)
        project_id: string, Name of Google project table resides in
        dataset_id: string, Name of dataset table resides in
        table: string, Name of table to delete (make sure you get this one right!)

    Returns:
        Response from BigQuery in a JSON format
    """
    tables_object = service.tables()
    req = tables_object.delete(projectId=project_id,datasetId=dataset_id,tableId=table)
    result = req.execute()
    
    return result


def job_status_loop(project_id, jobCollection, insertResponse,waitTimeSecs=10):
    """Monitors BigQuery job and prints out status until the job is complete.

    Args:
        project_id: string, Name of Google project table resides in
        jobCollection: jobs() object, Name of jobs() object that called the job insert
        insertResponse: JSON object, The JSON object returned when calling method jobs().insert().execute()
        waitTimeSecs: integer, Number of seconds to wait between checking job status

    Returns:
        Nothing
    """
    while True:
        job = jobCollection.get(projectId=project_id,
                                 jobId=insertResponse['jobReference']['jobId']).execute()
     

        if 'DONE' == job['status']['state']:
            print 'Done Loading!'
            if 'errorResult' in job['status']:
                print 'Error loading table: ', pprint.pprint(job)
            return

        print 'Waiting for loading to complete...'
        time.sleep(waitTimeSecs)

        if 'errorResult' in job['status']:
            print 'Error loading table: ', pprint.pprint(job)
            return


def list_datasets(service, project_id):
    """Lists BigQuery datasets.

    Args:
        service: BigQuery service object that is authenticated.  Example: service = build('bigquery','v2', http=http)
        project_id: string, Name of Google project

    Returns:
        List containing dataset names
    """
    datasets = service.datasets()
    response = datasets.list(projectId=PROJECT_NUMBER).execute()

    dataset_list = []
    for field in response['datasets']:
        dataset_list.append(field['datasetReference']['datasetId'])

    return dataset_list


def load_table_from_file(service, project_id, dataset_id, targettable, sourceCSV,field_list=None,delimiter='\t',skipLeadingRows=0, overwrite=False):
    """Loads a table in BigQuery from a delimited file (default is tab delimited).

    Args:
        service: BigQuery service object that is authenticated.  Example: service = build('bigquery','v2', http=http)
        project_id: string, Name of Google project
        dataset_id: string, Name of dataset table resides in
        targettable: string, Name of table to create or append data to
        sourceCSV: string, Path of the file to load
        field_list: list, Schema of the file to be loaded
        delimiter: string, Column delimiter for file, default is tab (optional)
        skipLeadingRows: integer, Number of rows to skip, default is 0 (optional)
        overwrite: boolean, defaults to False which will append data to table, True would overwrite

    Returns:
        Returns job response object.  Prints out job status every 10 seconds.
    """
    
    jobCollection = service.jobs()
    
     # Set if overwriting or appending to table
    if overwrite:
        write_disposition = 'WRITE_TRUNCATE'
    else:
        write_disposition = 'WRITE_APPEND'

    jobData = {
        'projectId': project_id,
        'configuration': {
            'load': {
              'sourceUris': [sourceCSV],
              'fieldDelimiter': delimiter,
              'schema':
                { 
                    'fields': field_list
                },
            'destinationTable': {
              'projectId': project_id,
              'datasetId': dataset_id,
              'tableId': targettable
            },
            'skipLeadingRows': skipLeadingRows,
            'createDisposition': 'CREATE_IF_NEEDED',
            'writeDisposition': write_disposition,
          }
        }
      }

    insertResponse = jobCollection.insert(projectId=project_id, body=jobData).execute()
    job_status_loop(project_id,jobCollection,insertResponse)

    return insertResponse

def load_table_from_json(service, project_id, dataset_id, target_table, source_file, field_list=None, overwrite=False):
    """Load a local JSON data file to a BigQuery table.  
        Example field list:
            field_list = [ {'name': 'ID', 'type': 'INTEGER'}, {'name': 'Day', 'type': 'TIMESTAMP'}, 
                    {'name': 'ViewTimeInMinutes', 'type': 'FLOAT'}, {'name': 'LoadDate', 'type': 'TIMESTAMP'}]

        Args:
            service: BigQuery service object that is authenticated.  Example: service = build('bigquery','v2', http=http)
            project_id: string, Name of google project
            dataset_id: string, Name of dataset for the table
            target_table: string, Name of table to write to
            source_file: string, path for the source file within google cloud
            field_list: list of json entries representing field and datatype, such as {'name': 'ID', 'type': 'INTEGER'}
            overwrite: boolean, defaults to False which will append data to table, True would overwrite

        Returns:
            None
    """
    jobCollection = service.jobs()
    import json
    
    # Set if overwriting or appending to table
    if overwrite:
        write_disposition = 'WRITE_TRUNCATE'
    else:
        write_disposition = 'WRITE_APPEND'

    jobData = {
        'projectId': project_id,
        'configuration': {
            'load': {
              'sourceUris': [source_file],
              'sourceFormat': 'NEWLINE_DELIMITED_JSON',
              'schema':
                { 
                    'fields': field_list
                },
            'destinationTable': {
              'projectId': project_id,
              'datasetId': dataset_id,
              'tableId': target_table
            },
            'createDisposition': 'CREATE_IF_NEEDED',
            'writeDisposition': write_disposition, # [Optional] Specifies the action that occurs if the destination table already exists. The following values are supported: WRITE_TRUNCATE: If the table already exists, BigQuery overwrites the table data. WRITE_APPEND: If the table already exists, BigQuery appends the data to the table. WRITE_EMPTY: If the table already exists and contains data, a 'duplicate' error is returned in the job result. The default value is WRITE_EMPTY. Each action is atomic and only occurs if BigQuery is able to complete the job successfully. Creation, truncation and append actions occur as one atomic update upon job completion.
          }
        }
      }

    insertResponse = jobCollection.insert(projectId=project_id, body=jobData).execute()
    job_status_loop(project_id,jobCollection,insertResponse)

def load_table(service, project_id, job_data):
    """This is a basic wrapper for the google big query jobs.insert() method.

        Args:
            service: BigQuery service object that is authenticated.  Example: service = build('bigquery','v2', http=http)
            project_id: string, Name of google project
            job_data: json with job details

        Returns:
            None
    """
    jobCollection = service.jobs()
    insertResponse = jobCollection.insert(projectId=project_id, body=job_data).execute()
    job_status_loop(project_id,jobCollection,insertResponse)


def load_from_query(service, project_id, dataset_id, target_table, source_query,overwrite = False):
    """
        Args:
            service: BigQuery service object that is authenticated.  Example: service = build('bigquery','v2', http=http)
            project_id: string, Name of google project
            dataset_id: string, Name of dataset for the destination table
            target_table: string, Name of table to write to
            source_query: string, query to run on BigQuery for the source data (keep the resultset small or this will fail)
            overwrite: boolean, set as True to ovewrite data in destination table (optional)

        Returns:
            None
    """    
    job_collection = service.jobs()

    if overwrite:
        write_disposition = 'WRITE_TRUNCATE'
    else:
        write_disposition = 'WRITE_APPEND'
    
    job_data = {
        'projectId': project_id,
        'configuration': {
            'query': {
                'allowLargeResults': 'True',
                'flattenResults': 'True', # [Experimental] Flattens all nested and repeated fields in the query results. The default value is true. allowLargeResults must be true if this is set to false.
                'destinationTable': {
                    'projectId': project_id,
                    'datasetId': dataset_id,
                    'tableId': target_table,
                },
                'priority': 'BATCH',
                'writeDisposition': write_disposition, # [Optional] Specifies the action that occurs if the destination table already exists. The following values are supported: WRITE_TRUNCATE: If the table already exists, BigQuery overwrites the table data. WRITE_APPEND: If the table already exists, BigQuery appends the data to the table. WRITE_EMPTY: If the table already exists and contains data, a 'duplicate' error is returned in the job result. The default value is WRITE_EMPTY. Each action is atomic and only occurs if BigQuery is able to complete the job successfully. Creation, truncation and append actions occur as one atomic update upon job completion.
                'createDisposition': 'CREATE_IF_NEEDED', # [Optional] Specifies whether the job is allowed to create new tables. The following values are supported: CREATE_IF_NEEDED: If the table does not exist, BigQuery creates the table. CREATE_NEVER: The table must already exist. If it does not, a 'notFound' error is returned in the job result. The default value is CREATE_IF_NEEDED. Creation, truncation and append actions occur as one atomic update upon job completion.
                'query':source_query,    
            },
        },
    }

    response = job_collection.insert(projectId=project_id, body=job_data).execute()
    #print response
    job_status_loop(project_id,job_collection,response)


def export_table(service, project_id, dataset_id, source_table, destination_uris, compress = False, delimiter = '\t', print_header = True):
    """Export BigQuery table to file(s)
        Args:
            service: BigQuery service object that is authenticated.  Example: service = build('bigquery','v2', http=http)
            project_id: string, Name of google project
            dataset_id: string, Name of dataset for the destination table
            source_table: string, Name of table to export to files
            destination_uris: list, Path(s) where data will be saved (include * to allow multiple files)
            compress: optional, True to do gzip compression
            delimiter: string, Defaults to tab delimited '\t'

        Returns:
            None
    """    
    job_collection = service.jobs()

    if compress:
        compression = 'GZIP'
    else:
        compression = 'NONE'
    
    destination_format = 'CSV'

    job_data = {
        'projectId': project_id,
        'configuration': {
            'extract': {
                'destinationUris': destination_uris,
                'compression': compression,
                'fieldDelimiter': delimiter,
                'printHeader': print_header,
                'sourceTable': {
                    'projectId': project_id,
                    'datasetId': dataset_id,
                    'tableId': source_table,
                },   
            },
        },
    }

    response = job_collection.insert(projectId=project_id, body=job_data).execute()
    #print response
    job_status_loop(project_id,job_collection,response)
