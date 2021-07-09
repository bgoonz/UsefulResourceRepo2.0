#!/usr/bin/env python
import sys
import time
import pyodbc
import json
from psdata_toolbox import process_data_row
from psdata_toolbox import _defaultencode

def mssql_connect(server, database, username, password):
    """Build pyodbc connection to SQL Server from file, assuming driver name is "ODBC Driver 11 for SQL Server"

        Args:
            server: string, name or ip address for SQL Server
            database: string, database name
            username: string, useranme for the database
            password: string, password for the database
    
        Returns:
            pyodbc connection object
    """
    try:
        # Simba SQL Server ODBC Driver
        #ODBC Driver 11 for SQL Server
        connect_string = 'DRIVER={ODBC Driver 11 for SQL Server};SERVER=' + server + ';DATABASE=' + database + ';UID=' + username + ';PWD=' + password
        connection = pyodbc.connect(connect_string)
    except (ValueError) as e:
        print "Error creating database connection", e

    return connection


def insert_list_to_sql(connection,lst,tableName):
    """Inserts from a list to a SQL table.  List must have the same format and item order as the table columns.
        Args:
            list: list, Values to insert to table
            tableName: string, Fully qualified SQL table name

        Returns:
            None
    """ 
    sorted_column_values_list = []
    for items in lst:
        sorted_column_values_list.append(items)

    for val in sorted_column_values_list:
        valstring = '('
        for colval in val:
            try:
                valstring += "'" + colval + "',"
            except TypeError:
                valstring += str(colval) +','
        valstring = valstring[0:-1] + ')' #remove trailing comma
        query = "INSERT INTO {0} VALUES {1}".format(tableName, valstring)

        c = run_sql(connection,query)
        #print type(c)
    return

def insert_list_to_sql_batch(connection,lst,tableName,batchsize=1000):
    """Inserts from a list to a SQL table.  List must have the same format and item order as the table columns.
        Args:
            list: list, Values to insert to table
            tableName: string, Fully qualified SQL table name
            batchsize: specifies what size you'd want the batches to run as
            connection: sql server connection

        Returns:
            None
    """ 
    insertvals = ''
    batchcnt = 0
    lstcnt = 0
    lstsize = len(lst)
    rowstr = 'SELECT '
    for row in lst:
        if batchcnt == batchsize or lstcnt == lstsize:
            for val in row:
                if type(val) == int or val == 'null':
                    rowstr += str(val) +','
                else:
                    rowstr += "'" + str(val) + "',"
            insertvals = insertvals + rowstr[:-1] + ' UNION ALL '
            c = run_sql(connection,"INSERT INTO {0} {1}".format(tableName, insertvals[:-11]))
            insertvals = ''
            rowstr = 'SELECT '
            batchcnt = 0
        else:
            for val in row:
                    if type(val) == int or val == 'null':
                        rowstr += str(val) +','
                    else:
                        rowstr += "'" + str(val) + "',"
            insertvals = insertvals + rowstr[:-1] + ' UNION ALL '
            rowstr = 'SELECT '
            batchcnt += 1
            lstcnt += 1

    if batchcnt > 0:
        c = run_sql(connection,"INSERT INTO {0} {1}".format(tableName, insertvals[:-11]))

    return


def run_sql(connection,query): #courseTagDict
    """Runs SQL statement and commits changes to database.
        
        Args:
            connection: pyodbc.connect() object, Connection to use when running Sql 
            query: string, Valid query string

        Returns:
            cursor object, Results of the call to pyodb.connection().cursor().execute(query)
    """ 
    cursor=connection.cursor()
    cursor.execute(query.encode('utf-8'))
    connection.commit()

    return cursor


def truncate_sql_table(connection,table_name):
    """Runs truncate table SQL command and commits changes to database.
        
        Args:
            connection: pyodbc.connect() object, Connection to use for truncate
            tableName: string, Fully qualified SQL table name (make sure this is the table you want to clear!)

        Returns:
            None
    """ 
    sql = "truncate table " + table_name
    cursor=connection.cursor()
    cursor.execute(sql.encode('utf-8'))
    connection.commit()

    return


def sql_get_schema(connection,query,include_extract_date = True):
    """Reads schema from database by running the provided query.  It's recommended to
    pass a query that is limited to 1 record to minimize the amount of rows accessed on 
    the server.

        Args:
            connection: pyodbc.connect() object, Connection to use when running Sql 
            query: string, Valid query string
            include_extract_date: boolean, defaults to True to add current timestamp field 
                    'ExtractDate' to results

        Returns:
            list, each list item contains field name and data type
    """
    import json

    cursor = connection.cursor()
    cursor.execute(query)
    
    schema_list = []
    #colList = []
    #typeList = []
    for i in cursor.description:
        schema_list.append(i[0:2])
        #colList.append(i[0])
        #typeList.append(str(i[1]))
    if include_extract_date:
        schema_list.append(['ExtractDate','datetime'])
    return schema_list


def sql_get_table_data(connection, table, schema='dbo', include_extract_date = True):
    """Runs SQL statement to get all records from the table (select *)
        
        Args:
            connection: pyodbc.connect() object, Connection to use when selecting data 
            table: string, Valid table

        Returns:
            cursor object, Results of the call to pyodb.connection().cursor().execute(query)
    """ 
    extract_date = ""
    if include_extract_date:
        extract_date = ", getdate() as ExtractDate"
    query = 'select * ' + extract_date + ' from ' + schema + '.[' + table + '] with (nolock)'
    print query
    cursor=connection.cursor()
    cursor.execute(query.encode('utf-8'))

    return cursor


def sql_get_query_data(connection, query):
    """Runs SQL statement to get results of query specified, returned and pyodbc cursor.
        
        Args:
            connection: pyodbc.connect() object, Connection to use when selecting data 
            query: string, Valid select statement

        Returns:
            cursor object, Results of the call to pyodb.connection().cursor().execute(query)
    """ 
    cursor=connection.cursor()
    cursor.execute(query.encode('utf-8'))

    return cursor


def cursor_to_json(cursor, dest_file, dest_schema_file=None, source_schema_file=None):
    """Takes a cursor and creates JSON file with the data 
    and a schema file for loading to other data systems.

    Args:
        cursor: cursor object with data to extract to file
        dest_file: string, path and file name to save data

    Returns:
        None
    """
    if source_schema_file is None:
        schema = []
        for i in cursor.description:
            schema.append([i[0],str(i[1])])
    else:
        from psdata_files import get_schema_file
        schema = get_schema_file(source_schema_file)

    if dest_schema_file is not None:
        with open(dest_schema_file,'wb') as schemafile:
            for row in schema:
                col = row[0]
                if 'date' in row[1]:
                    datatype = 'timestamp'
                elif 'list' in row[1]:
                    datatype = 'list'
                elif 'int' in row[1] or 'long' in row[1]:
                    datatype = 'integer'
                elif 'float' in row[1]:
                    datatype = 'float'
                elif 'bool' in row[1]:
                    datatype = 'boolean'
                elif 'str' in row[1]:
                    datatype = 'string'
                else:
                    datatype = 'string'
                schemafile.write("%s\n" % (col + ',' + datatype))

    with open(dest_file,'wb') as outfile:
        for row in cursor:
            result_dct = process_data_row(row,schema)
            outfile.write("%s\n" % json.dumps(result_dct, default=_defaultencode))

def load_csv_to_table(table ,schema_file ,csv_file, server, database, config,cred_file='config/dblogin.config',skipfirstrow=1):
    """Takes csv file, schema file, with sql server connection params and inserts data to a specified table

    Args:
        table: table name where csv data will be written
        schema_file: schema file that has all column names and data type names
        csv_file: data being loaded
        server: sql server host name
        config: which configuration name to pull username and password credentials
        cred_file: location of db login config file
        skipfirstrow(optional): if 1 then skip the first row of data (exclude headers)

    Returns:
        None
    """    
    from psdata_files import loop_csv_file
    from psdata_files import get_schema_file

    with open(cred_file,'rb') as cred:
        db_info = json.loads(cred.read())

    username = db_info[config]['username']
    password = db_info[config]['password']

    data_list = loop_csv_file(csv_file)

    connection = mssql_connect(server, database, username, password)

    schema_list = get_schema_file(schema_file)
    #skips the first value of data_list which is the header
    data_list = iter(data_list)
    if skipfirstrow == 1:
        next(data_list)

    process_datarow_to_list(data_list,schema_list,connection,table)

def process_datarow_to_list(data_list, schema_list, connection, table):
    """gets a data list and converts it to the correct data type for inserts then inserts data to a table

    Args:
        data_list: a list of lists which contain data row Values
        schema_list: a list of lists which contains all the column names with their respective data type

    Returns:
        None
    """
    insert_list = []
    for i in data_list:
        load_list = []
        for j, val in enumerate(i):
            if 'int' in schema_list[j][1]:
                if val == 'null':
                    load_list.append('null')
                else:
                    load_list.append(int(val))
            elif 'date' in schema_list[j][1]:
                load_list.append(str(val)[:19])
            else:
                load_list.append(str(val))
        insert_list.append(load_list)

    insert_list_to_sql_batch(connection, insert_list, table,100)








