"""Test statements to prove that DavisBase backend works."""

from random import randint, random, choice
from datetime import datetime
from davisbase import *
import time

if os.path.exists('davisbase_columns.tbl'):
    os.remove('davisbase_columns.tbl')
if os.path.exists('davisbase_tables.tbl'):
    os.remove('davisbase_tables.tbl')



#create catalog
init()

print("====================================================================")
print("DAVISBASE CATALOG")
print("====================================================================")
print_it("davisbase_columns.tbl", page_format=False)
print()
print_it("davisbase_tables.tbl", page_format=False)
print()
input("Continue? (Press Enter): ").upper()
print()



print("====================================================================")
print("CREATE TABLE")
print("====================================================================")
print()
print("NEW TABLE NAME: example_table")
print("SCHEMA: [INT, FLOAT, TEXT, DATETIME, YEAR]")

col_catalog_dictionary = {
    'example_table':{
        "int_col":{
            'data_type':"int",
            'ordinal_position':1,
            'is_nullable':'YES',
            'unique':'NO',
            'primary_key':'YES'
            },
        "float_col":{
            'data_type':"float",
            'ordinal_position':2,
            'is_nullable':'YES',
            'unique':'NO',
            'primary_key':'NO'
            },
        "text_col":{
            'data_type':"text",
            'ordinal_position':3,
            'is_nullable':'YES',
            'unique':'NO',
            'primary_key':'NO'
            },
            "datetime_col":{
                'data_type':"datetime",
                'ordinal_position':4,
                'is_nullable':'YES',
                'unique':'NO',
                'primary_key':'NO'
                },
            "year_col":{
                'data_type':"year",
                'ordinal_position':5,
                'is_nullable':'YES',
                'unique':'NO',
                'primary_key':'NO'
                },
        }
    }
table_name = list(col_catalog_dictionary.keys())[0]
initialize_file(table_name, True)
catalog_add_table(col_catalog_dictionary)
initialize_indexes(col_catalog_dictionary)
print()
print("New entries in catalog")
print_it("davisbase_columns.tbl", page_format=False)
print()
print_it("davisbase_tables.tbl", page_format=False)
print()

input("Continue? (Press Enter): ").upper()
print()



print("===============================================================")
print("TABLE INSERTS")
print("====================================================================")
def random_string():
    text = 'abcdefghijklmnopqrstuvwxyz    '
    out = ''
    for i in range(randint(5,15)):
        out+=choice(text)
    return out

data = [[randint(0,1000),random(), random_string(),datetime(randint(2007,2019),randint(1,12),randint(1,28)), randint(2000,2019)] for i in range(200)]
print("Example insert", data[0])
print()
for row in data:
    table_insert('example_table', row)

print_it("example_table.tbl", page_format=True, limit=25)
print()
print_it("example_table.tbl", page_format=False, limit=25)

print()
input("Continue? (Press Enter): ").upper()
print()

print("===============================================================")
print("EXAMPLE CATALOG PAGE")
print("====================================================================")
file_bytes = load_file('example_table.tbl')
print()
print(load_page(file_bytes, 0))
print()
print("PAGE CONTENTS")
page = read_all_pages_in_file('example_table.tbl')[0]
for i in page:
    if i=='cells':
        print("Example cell: ", page[i][0])
        continue
    print(i,":", page[i])
print()
input("Continue? (Press Enter): ").upper()
print()

print("===============================================================")
print("TABLE UPDATES")
print("====================================================================")

dict_new_values = {
    "int_col":1,
    "text_col":"HARRISON",
    }
list_of_rowids = [randint(1,100) for i in range(1,30)]
print("First five Rowids to update: ", list_of_rowids[:5])
print("Update values", 'int_col:1, text_col:HARRISON')
print()
table_update('example_table'+'.tbl', list_of_rowids, dict_new_values)
print_it('example_table.tbl',False, 25)
print()
input("Continue? (Press Enter): ").upper()
print()
print("===============================================================")
print("TABLE DELETES")
print("====================================================================")


to_delete = [randint(1,50) for i in range(20)]
print("First five rowids to delete", to_delete[:5])
print()
table_delete('example_table.tbl', to_delete)

print_it('example_table.tbl',False, 10)
print()
input("Continue? (Press Enter): ").upper()
print()
print("===============================================================")
print("DROP TABLE")
print("====================================================================")

print("UPDATED SCHEMA")
print()
table_name = 'example_table'
drop_table_backend(table_name)
print()
