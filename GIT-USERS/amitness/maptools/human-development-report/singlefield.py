import csv
import getopt
from shared import geoidmappings
import sys
from itertools import groupby
from operator import itemgetter


def national_totals(rows, column_name):
    total = sum(map(lambda i: int(i[column_name]), rows))
    return [{"geo_level": "country", "geo_code": "NP", column_name: total}]


def convert_csv(input_file, output_file, column, separator, sum_national):
    rows = []
    with open(input_file, "r") as data:
        reader = csv.DictReader(data, delimiter=separator)
        for row in reader:
            geo_code = geoidmappings.names_to_geo_ids[row["district"].strip()]
            rows.append(
                {
                    "geo_level": "district",
                    "geo_code": geo_code,
                    column: row[column].replace(",", ""),
                }
            )
        if sum_national:
            national = national_totals(rows, column)
            all_rows = national + rows
        else:
            all_rows = rows
    sorted_rows = sorted(all_rows, key=lambda x: x.get("geo_code"))
    with open(output_file, "w") as csv_out:
        csv_keys = sorted_rows[0].keys()
        writer = csv.DictWriter(csv_out, fieldnames=csv_keys)
        writer.writeheader()
        for row in sorted_rows:
            writer.writerow(row)

    print("Done!")


def main(args):
    indir = ""
    outputcsv = ""
    column = ""
    separator = ","
    sumnational = False
    try:
        opts, args = getopt.getopt(
            args,
            "hi:o:c:t:s",
            ["indir=", "outputcsv=", "column=", "tabseparated", "sumnational"],
        )
    except getopt.GetoptError:
        print("python singlefield.py -i <indir> -o <outputcsv> " "-c <column> -t -s")
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print(
                "python singlefield.py -i <indir> -o <outputcsv> " "-c <column> -t -s"
            )
            sys.exit()
        elif opt in ("-i", "--indir"):
            indir = arg
        elif opt in ("-o", "--outputcsv"):
            outputcsv = arg
        elif opt in ("-c", "--column"):
            column = arg
        elif opt in ("-t", "--tabseparated"):
            separator = "\t"
        elif opt in ("-s", "--sumnational"):
            sumnational = True

    convert_csv(indir, outputcsv, column, separator, sumnational)


if __name__ == "__main__":
    main(sys.argv[1:])
