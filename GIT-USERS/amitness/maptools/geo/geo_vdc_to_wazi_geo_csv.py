import csv
import getopt
from itertools import groupby
from operator import itemgetter
from os import path
import sys

"""
Reads in a csv file that is the product of maptools/geo/vdc_to_csv.py and
creates another csv file for inputting data into the wazimap_geography table
for nepalmap
"""


def vdc_names(infilename, outfilename):
    print("Reading from {} and writing to {}".format(infilename, outfilename))
    if not path.isfile(infilename):
        print("No such file: {}".format(infilename))
        sys.exit(1)

    def extract_vdc(geo_row):
        return {
            "geo_level": "vdc",
            "geo_code": geo_row["vdc_geo_code"],
            "name": geo_row["vdc"],
            "long_name": geo_row["vdc"],
            "year": 2016,
            "parent_level": "district",
            "parent_code": geo_row["district_id"],
        }

    with open(infilename, "r") as infile, open(outfilename, "w") as outfile:
        reader = csv.DictReader(infile)
        vdcs = [extract_vdc(row) for row in reader]

        fieldnames = [
            "name",
            "geo_code",
            "year",
            "parent_level",
            "long_name",
            "geo_level",
            "parent_code",
        ]
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()
        districtgetter = itemgetter("parent_code")
        district_groups = []
        for key, group in groupby(sorted(vdcs, key=districtgetter), districtgetter):
            district_groups.append(sorted(list(group), key=lambda vdc: vdc["geo_code"]))
        writer.writerows(
            [vdc for district_vdcs in district_groups for vdc in district_vdcs]
        )

    print("Done!")


def main(args):
    inputcsv = ""
    outputcsv = ""
    try:
        opts, args = getopt.getopt(args, "hi:o:", ["inputcsv=", "outputcsv="])
    except getopt.GetoptError:
        print("python vdc_names.py -i <inputcsv> -o <outputcsv>")
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print("python vdc_names.py -i <inputcsv>  -o <outputcsv>")
            sys.exit()
        elif opt in ("-i", "--inputcsv"):
            inputcsv = arg
        elif opt in ("-o", "--outputcsv"):
            outputcsv = arg

    vdc_names(inputcsv, outputcsv)


if __name__ == "__main__":
    main(sys.argv[1:])
