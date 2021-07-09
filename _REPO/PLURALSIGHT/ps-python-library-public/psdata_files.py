#!/usr/bin/env python

import sys
import json
import csv
import time

import logging

logging.basicConfig()  # included to avoid message when oauth2client tries to write to log


def loop_csv_file(source_csv):
    """Loops through a comma separated file and returns a list of data.  If column names are on the
    first line of the file they will be the first row of the list

    Args:
        source_csv: source path for the file

    Results:
        list, one row per list item
    """
    import csv

    file_data = []
    with open(source_csv, "rb") as csvfile:
        file_reader = csv.reader(csvfile, delimiter=",", quotechar='"')
        for row in file_reader:
            file_data.append(row)
    return file_data


def loop_delimited_file(source_file, delimiter=",", quotechar='"'):
    """Loops through a delimited file and returns a list of data.  If column names are on the
    first line of the file they will be the first row of the list

    Args:
        source_file: source path for the file
        delimiter: character/string to use as file delimited (default delimiter is comma)
        quotechar: character used to qualify strings (default is '"')

    Results:
        list, one row per list item
    """
    import csv

    file_data = []
    with open(source_file, "rb") as csvfile:
        file_reader = csv.reader(csvfile, delimiter=delimiter, quotechar=quotechar)
        for row in file_reader:
            file_data.append(row)
    return file_data


def gzip_file_create(source_file, dest_file=None):
    """Create gzip file from existing file (https://docs.python.org/2/library/gzip.html).
    Note: this does not delete the source file.

    Args:
        source_file: source path for the file to zip
        dest_file: path for the zipped version of file (default is source_file + .gz)

    Returns:
        None
    """
    import gzip

    # destCSV = sourceCSV + '.gz'
    if dest_file is None:
        dest_file = source_file + ".gz"
    f_in = open(source_file, "rb")
    f_out = gzip.open(dest_file, "wb")
    f_out.writelines(f_in)
    f_out.close()
    f_in.close()


def gzip_decompress(source_file, dest_file=None):
    """Create unzipped file from existing gzip file (https://docs.python.org/2/library/gzip.html).
    Note: this does not delete the source file.

    Args:
        source_file: source path for the file to unzip
        dest_file: path to write the unzipped version of file (default is source_file - .gz)

    Returns:
        None
    """
    import gzip

    if dest_file is None:
        dest_file = source_file.replace(".gz", "")
    f = gzip.open(source_file, "rb")
    file_data = f.read()
    f_out = open(dest_file, "wb")
    f_out.writelines(file_data)
    f_out.close()
    f.close()


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


def json_file_to_tsv(
    source_file,
    dest_file,
    fieldnames,
    source_gzipped=False,
    boolean_type_supported=False,
    include_header_row=True,
):
    """Read JSON data and write out a tab separated file, typically case is to bulk load it to SQL
    Server
            Args:
                source_file: full path of json file to change to tab delimited
                dest_file: full path for destination file (file extension is not added by this function
    )
                fieldnames: list of field names that match dictionary keys, such as fieldnames = ['colu
    mn1', 'column2', 'column3']
                sourect_gzipped: boolean, optional way to specify source file needed unzipped (default
    is False)
                boolean_type_supported: boolean, created to override conversion of boolean values to bi
    t for loading to SQL Server,
                    set to True if True/False entries should not be converted to 1 or 0 (default is Fal
    se)
            Returns:
                None
    """
    if source_gzipped:
        gzip_decompress(source_file)
        source_file = source_file.replace(".gz", "")
        # print 'File unzipped'

    # Build list of dictionaries (one list record per data row)
    data_records_list = []
    with open(source_file, "rb") as file_in:
        for row in file_in:
            tmp_dct = json.loads(row)
            for k, z in tmp_dct.items():
                if not boolean_type_supported:
                    try:
                        if str(z).upper() == "TRUE":
                            tmp_dct[k] = 1
                        elif str(z).upper() == "FALSE":
                            tmp_dct[k] = 0
                    except UnicodeEncodeError:
                        pass
                    try:
                        tmp_dct[k] = z.encode("utf-8").replace("\t", " ")
                    except AttributeError:
                        pass
            data_records_list.append(tmp_dct)

    # Write list of dictionaries to tab separated file
    out_file_path = dest_file
    out_file = open(out_file_path, "wb")
    csvwriter = csv.DictWriter(
        out_file, delimiter="\t", fieldnames=fieldnames, dialect="excel"
    )
    if include_header_row:
        csvwriter.writerow(dict((fn, fn) for fn in fieldnames))
    for row in data_records_list:
        csvwriter.writerow(row)
    out_file.close()


def loop_json_file(source_file, source_gzipped=False, boolean_type_supported=False):
    """Read JSON data and write out a tab separated file, typically case is to bulk load it to SQL
    Server
            Args:
                source_file: full path of json file to change to tab delimited
                dest_file: full path for destination file (file extension is not added by this function
    )
                fieldnames: list of field names that match dictionary keys, such as fieldnames = ['colu
    mn1', 'column2', 'column3']
                sourect_gzipped: boolean, optional way to specify source file needed unzipped (default
    is False)
                boolean_type_supported: boolean, created to override conversion of boolean values to bi
    t for loading to SQL Server,
                    set to True if True/False entries should not be converted to 1 or 0 (default is Fal
    se)
            Returns:
                None
    """
    if source_gzipped:
        gzip_decompress(source_file)
        source_file = source_file.replace(".gz", "")
        # print 'File unzipped'

    # Build list of dictionaries (one list record per data row)
    data_records_list = []
    with open(source_file, "rb") as file_in:
        for row in file_in:
            tmp_dct = json.loads(row)
            for k, z in tmp_dct.items():
                if not boolean_type_supported:
                    try:
                        if str(z).upper() == "TRUE":
                            tmp_dct[k] = 1
                        elif str(z).upper() == "FALSE":
                            tmp_dct[k] = 0
                    except UnicodeEncodeError:
                        pass
                    try:
                        tmp_dct[k] = z.encode("utf-8").replace("\t", " ")
                    except AttributeError:
                        pass
            data_records_list.append(tmp_dct)

    return data_records_list
