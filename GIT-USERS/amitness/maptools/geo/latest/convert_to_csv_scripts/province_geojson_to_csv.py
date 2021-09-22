import getopt
import csv
import json
import re
import sys


"""
Script to grab basic details about each province from the province.geojson file
and build a CSV for analysis of names and parent to which each province is assigned
"""


def convert_csv(input_file, output_file):
    with open(input_file, "r") as data_file:
        data = json.load(data_file)

        def select_keys_from_properties(province):
            return {
                "name": province["name"],
                "geocode": province["code"],
                "year": "2016",
                "parent_level": "country",
                "long_name": province["name"],
                "geo_level": "province",
                "parent_code": "NP",
            }

        properties = list(
            map(
                lambda f: select_keys_from_properties(f["properties"]), data["features"]
            )
        )

        fieldnames = [
            "name",
            "geocode",
            "year",
            "parent_level",
            "long_name",
            "geo_level",
            "parent_code",
        ]

        sorted_properties = sorted(
            properties, key=lambda elem: "%s" % (elem["geocode"])
        )

        with open(output_file, "w") as csv_out:
            writer = csv.DictWriter(csv_out, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(sorted_properties)

    print("Done!")


def main(args):
    indir = ""
    outputcsv = ""
    try:
        opts, args = getopt.getopt(args, "hi:o:", ["inputjson=", "outputcsv="])
    except getopt.GetoptError:
        print("python province_geojson_csv.py -i <inputjson> -o <outputcsv>")
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print("python province_geojson_csv.py -i <inputjson> -o <outputcsv>")
            sys.exit()
        elif opt in ("-i", "--inputjson"):
            indir = arg
        elif opt in ("-o", "--outputcsv"):
            outputcsv = arg

    convert_csv(indir, outputcsv)


if __name__ == "__main__":
    main(sys.argv[1:])
