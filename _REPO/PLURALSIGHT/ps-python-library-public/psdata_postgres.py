#!/usr/bin/env python
import sys
import time
import psycopg2
import json
from psdata_toolbox import process_data_row
from psdata_toolbox import _defaultencode
from psdata_files import loop_csv_file
from psdata_files import get_schema_file
from psdata_files import loop_delimited_file
from psdata_files import json_file_to_tsv
from psdata_files import loop_json_file


def connect(server, database, username, password):
    """Build connection to Postgres

    Args:
        server: string, name or ip address for server
        database: string, database name
        username: string, useranme for the database
        password: string, password for the database

    Returns:
        psycopg2 connection object
    """

    connection = psycopg2.connect(
        "dbname='{0}' host='{1}' user='{2}' password='{3}'".format(
            database, server, username, password
        )
    )
    return connection


def insert_row_to_db(connection, lst, tableName):
    """Inserts from a list to a SQL table.  List must have the same format and item order as the table columns.
    Args:
        list: list, Values to insert to table
        tableName: string, Fully qualified SQL table name

    Returns:
        None
    """
    # for val in row:
    #     if type(val) == int or val == 'null':
    #         rowstr += str(val) + ','
    #     else:
    #         rowstr += "'" + str(val) + "',"

    valstring = "("
    for colval in lst:
        try:
            if colval != "null":
                valstring += "'" + colval + "',"
            else:
                valstring += str(colval) + ","
        except TypeError:
            valstring += str(colval) + ","
    valstring = valstring[0:-1] + ")"  # remove trailing comma
    query = "INSERT INTO {0} VALUES {1}".format(tableName, valstring)

    run_sql(connection, query)
    return


# formerly named insert_list_to_sql_batch
def insert_list_to_db(connection, lst, tableName, batchsize=1000):
    """Inserts from a list to a SQL table.  List must have the same format and item order as the table columns.
    Args:
        list: list, Values to insert to table
        tableName: string, Fully qualified SQL table name
        batchsize: specifies what size you'd want the batches to run as
        connection: sql server connection

    Returns:
        None
    """
    insertvals = ""
    batchcnt = 0
    lstcnt = 0
    lstsize = len(lst)
    rowstr = "SELECT "
    for row in lst:
        if batchcnt == batchsize or (lstcnt + 1) == lstsize:
            for val in row:
                if type(val) == int or val == "null":
                    rowstr += str(val) + ","
                else:
                    rowstr += "'" + str(val) + "',"
            insertvals = insertvals + rowstr[:-1] + " UNION ALL "
            c = run_sql(
                connection, "INSERT INTO {0} {1}".format(tableName, insertvals[:-11])
            )
            insertvals = ""
            rowstr = "SELECT "
            batchcnt = 0
        else:
            for val in row:
                if type(val) == int or val == "null":
                    rowstr += str(val) + ","
                else:
                    rowstr += "'" + str(val) + "',"
            insertvals = insertvals + rowstr[:-1] + " UNION ALL "
            rowstr = "SELECT "
            batchcnt += 1
            lstcnt += 1

    return


def run_sql(connection, query):  # courseTagDict
    """Runs SQL statement and commits changes to database.

    Args:
        connection: pyodbc.connect() object, Connection to use when running Sql
        query: string, Valid query string

    Returns:
        cursor object, Results of the call to pyodb.connection().cursor().execute(query)
    """
    cursor = connection.cursor()
    try:
        cursor.execute(query.encode("utf-8"))
    except UnicodeDecodeError:
        cursor.execute(query)
    connection.commit()

    return cursor


# def truncate_sql_table(connection,table_name):
#     """Runs truncate table SQL command and commits changes to database.

#         Args:
#             connection: pyodbc.connect() object, Connection to use for truncate
#             tableName: string, Fully qualified SQL table name (make sure this is the table you want to clear!)

#         Returns:
#             None
#     """
#     sql = "truncate table " + table_name
#     cursor=connection.cursor()
#     cursor.execute(sql.encode('utf-8'))
#     connection.commit()

#     return


def create_table(connection, table_name, schema_file, index):  # courseTagDict
    """Runs SQL statement and commits changes to database.

    Args:
        connection: pyodbc.connect() object, Connection to use when running Sql
        table_name: string, Table name including db schema (ex: my_schema.my_table)
        schema_file: string, Path to csv schema file with each row as col_name, data_type
        index: string, Column name of index (can put multiple columns comma delimited if desired)
    Returns:
        cursor object, Results of the call to pyodb.connection().cursor().execute(query)
    """
    cursor = connection.cursor()
    schema_list = get_schema_file(schema_file)

    ddl = "CREATE TABLE IF NOT EXISTS " + table_name + "("
    for col, dt in schema_list:
        ddl = ddl + col + " " + dt + ", "
    ddl = ddl[:-2] + ");"

    try:
        cursor.execute(ddl.encode("utf-8"))
    except UnicodeDecodeError:
        cursor.execute(ddl)

    if index is not None:
        idx_name = table_name + "_idx"
        exists = run_sql(connection, "SELECT to_regclass('{0}')".format(idx_name))
        if exists.fetchone()[0] != idx_name:
            index_name = table_name.split(".")[-1] + "_idx"
            ddl2 = "CREATE INDEX {0} ON {1}({2});".format(index_name, table_name, index)
            try:
                cursor.execute(ddl2.encode("utf-8"))
            except UnicodeDecodeError:
                cursor.execute(ddl2)

    connection.commit()
    return cursor


# def sql_get_schema(connection,query,include_extract_date = True):
#     """Reads schema from database by running the provided query.  It's recommended to
#     pass a query that is limited to 1 record to minimize the amount of rows accessed on
#     the server.

#         Args:
#             connection: pyodbc.connect() object, Connection to use when running Sql
#             query: string, Valid query string
#             include_extract_date: boolean, defaults to True to add current timestamp field
#                     'ExtractDate' to results

#         Returns:
#             list, each list item contains field name and data type
#     """
#     import json

#     cursor = connection.cursor()
#     cursor.execute(query)

#     schema_list = []
#     #colList = []
#     #typeList = []
#     for i in cursor.description:
#         schema_list.append(i[0:2])
#         #colList.append(i[0])
#         #typeList.append(str(i[1]))
#     if include_extract_date:
#         schema_list.append(['ExtractDate','datetime'])
#     return schema_list


def get_schema_file(schema_csv):
    """Pull in schema from a file and return list with column and type

    Args:
        schema_csv: two column comma delimited schema file formatted ColumnName,Type

    Returns:
        list, Schema list of column and type
    """
    schema_raw = loop_delimited_file(schema_csv)
    schema = []
    for column, datatype in schema_raw:
        schema.append([column.strip(" "), datatype.strip(" ")])
    return schema


# def sql_get_table_data(connection, table, schema='dbo', include_extract_date = True):
#     """Runs SQL statement to get all records from the table (select *)

#         Args:
#             connection: pyodbc.connect() object, Connection to use when selecting data
#             table: string, Valid table

#         Returns:
#             cursor object, Results of the call to pyodb.connection().cursor().execute(query)
#     """
#     extract_date = ""
#     if include_extract_date:
#         extract_date = ", getdate() as ExtractDate"
#     query = 'select * ' + extract_date + ' from ' + schema + '.[' + table + '] with (nolock)'
#     print query
#     cursor=connection.cursor()
#     cursor.execute(query.encode('utf-8'))

#     return cursor


# def sql_get_query_data(connection, query):
#     """Runs SQL statement to get results of query specified, returned and pyodbc cursor.

#         Args:
#             connection: pyodbc.connect() object, Connection to use when selecting data
#             query: string, Valid select statement

#         Returns:
#             cursor object, Results of the call to pyodb.connection().cursor().execute(query)
#     """
#     cursor=connection.cursor()
#     cursor.execute(query.encode('utf-8'))

#     return cursor


# def cursor_to_json(cursor, dest_file, dest_schema_file=None, source_schema_file=None):
#     """Takes a cursor and creates JSON file with the data
#     and a schema file for loading to other data systems.

#     Args:
#         cursor: cursor object with data to extract to file
#         dest_file: string, path and file name to save data

#     Returns:
#         None
#     """
#     if source_schema_file is None:
#         schema = []
#         for i in cursor.description:
#             schema.append([i[0],str(i[1])])
#     else:
#         from psdata_files import get_schema_file
#         schema = get_schema_file(source_schema_file)

#     if dest_schema_file is not None:
#         with open(dest_schema_file,'wb') as schemafile:
#             for row in schema:
#                 try:
#                     col = row[0]
#                     if 'date' in row[1]:
#                         datatype = 'timestamp'
#                     elif 'list' in row[1]:
#                         datatype = 'list'
#                     elif 'int' in row[1] or 'long' in row[1]:
#                         datatype = 'integer'
#                     elif 'float' in row[1]:
#                         datatype = 'float'
#                     elif 'bool' in row[1]:
#                         datatype = 'boolean'
#                     elif 'str' in row[1]:
#                         datatype = 'string'
#                     else:
#                         datatype = 'string'
#                     schemafile.write("%s\n" % (col + ',' + datatype))
#                 except Exception as e:
#                     print "Exception on row ", row
#                     print e
#     with open(dest_file,'wb') as outfile:
#         for row in cursor:
#             try:
#                 result_dct = process_data_row(row,schema)
#                 outfile.write("%s\n" % json.dumps(result_dct, default=_defaultencode))
#             except Exception as e:
#                 print "Exception on row ", row
#                 print e


def load_csv_to_table(table, schema_file, csv_file, connection, skipfirstrow=1):
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
    data_list = loop_csv_file(csv_file)

    schema_list = get_schema_file(schema_file)
    # skips the first value of data_list which is the header
    data_list = iter(data_list)
    if skipfirstrow == 1:
        next(data_list)

    insert_datarows_to_table(data_list, schema_list, connection, table)


def load_delimited_file_to_table(
    connection, table, source_file, schema_file, skipfirstrow=1, delimiter=","
):
    """Takes delimited file name, schema file, and db connection and inserts data to a specified table

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
    data_list = loop_delimited_file(source_file, delimiter=delimiter)
    schema_list = get_schema_file(schema_file)
    # skips the first value of data_list which is the header
    data_list = iter(data_list)
    if skipfirstrow == 1:
        next(data_list)
    insert_datarows_to_table(data_list, schema_list, connection, table)


def load_json_file_to_table(connection, table, source_file, schema_file):
    """Takes delimited file name, schema file, and db connection and inserts data to a specified table

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
    data_list = loop_json_file(source_file)
    schema_list = get_schema_file(schema_file)
    # data_list = iter(data_list)
    insert_datarows_dct_to_table(data_list, schema_list, connection, table)


# *formerly named process_datarow_to_list
def insert_datarows_to_table(data_list, schema_list, connection, table):
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
            if "int" in schema_list[j][1]:
                if val == "null" or val == "":
                    load_list.append("null")
                else:
                    load_list.append(int(val))
            elif "date" in schema_list[j][1]:
                load_list.append(str(val)[:19])
            elif "timestamp" in schema_list[j][1]:
                load_list.append(val[:19])
            else:
                load_list.append(str(val))
        insert_list.append(load_list)

    insert_list_to_db(connection, insert_list, table, 100)


def insert_datarows_dct_to_table(data_list, schema_list, connection, table):
    """gets a data list and converts it to the correct data type for inserts then inserts data to a table

    Args:
        data_list: a list of lists which contain data row Values
        schema_list: a list of lists which contains all the column names with their respective data type

    Returns:
        None
    """
    insert_list = []
    for row in data_list:
        load_list = []
        # for j, val in i.items():
        for col_name, data_type in schema_list:
            val = row[col_name]
            if "int" in data_type:
                if val == "null" or val == "":
                    load_list.append("null")
                else:
                    load_list.append(int(val))
            elif "date" in data_type:
                load_list.append(str(val)[:19])
            elif "timestamp" in data_type:
                load_list.append(val[:19])
            else:
                load_list.append(str(val))
        insert_list.append(load_list)

    insert_list_to_db(connection, insert_list, table, 100)


def insert_dct_to_table(dct, schema_list, connection, table):
    """gets a data list and converts it to the correct data type for inserts then inserts data to a table

    Args:
        data_list: a list of lists which contain data row Values
        schema_list: a list of lists which contains all the column names with their respective data type

    Returns:
        None
    """
    load_list = []
    for col_name, data_type in schema_list:
        val = dct[col_name]
        if val is None:
            load_list.append("null")
        elif "int" in data_type:
            if val == "null" or val == "":
                load_list.append("null")
            else:
                load_list.append(int(val))
        elif "float" in data_type:
            if val == "null" or val == "":
                load_list.append("null")
            else:
                load_list.append(float(val))
        elif "bool" in data_type:
            if val == "null" or val == "":
                load_list.append("null")
            else:
                load_list.append(val)
        elif "date" in data_type:
            load_list.append(str(val)[:19])
        elif "timestamp" in data_type:
            load_list.append(val[:19])
        else:
            load_list.append(str(val))
    insert_row_to_db(connection, load_list, table)
