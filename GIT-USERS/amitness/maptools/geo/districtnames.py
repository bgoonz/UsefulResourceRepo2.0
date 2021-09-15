import csv
import getopt
import json
from os import path
import sys

"""
Reads in the district.geojson file from nepalmap and writes out a csv file
for putting district-level data into wazimap_geography in nepalmap
"""


def districtnames(infilename, outfilename):
    print("Reading from {} and writing to {}".format(infilename, outfilename))
    if not path.isfile(infilename):
        print("No such file: {}".format(infilename))
        sys.exit(1)

    def extractnames(feature):
        return {
            "geo_level": feature["properties"]["level"],
            "geo_code": feature["properties"]["geoid"],
            "name": feature["properties"]["name"],
            "long_name": feature["properties"]["name"],
            "year": 2016,
            "parent_level": "country",
            "parent_code": "NP",
        }

    with open(infilename, "r") as infile, open(outfilename, "w") as outfile:
        geojson = json.load(infile)
        rows = list(map(extractnames, geojson["features"]))
        fieldnames = list(rows[0].keys())
        writer = csv.DictWriter(outfile, fieldnames=fieldnames, delimiter="\t")
        writer.writeheader()
        for row in rows:
            writer.writerow(row)

    print("Done!")


def main(args):
    geofile = ""
    outputcsv = ""
    try:
        opts, args = getopt.getopt(args, "hg:o:", ["geofile=", "outputcsv="])
    except getopt.GetoptError:
        print("python districtnames.py -g <geofile> -o <outputcsv>")
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print("python districtnames.py -g <geofile>  -o <outputcsv>")
            sys.exit()
        elif opt in ("-g", "--geofile"):
            geofile = arg
        elif opt in ("-o", "--outputcsv"):
            outputcsv = arg

    districtnames(geofile, outputcsv)


if __name__ == "__main__":
    main(sys.argv[1:])
