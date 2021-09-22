import getopt
import csv
import json
import re
import sys


"""
Script to grab basic details about each district from the district.geojson file
and build a CSV for analysis of names and parent to which each district is assigned
"""


def convert_csv(input_file, output_file):
    with open(input_file, "r") as data_file:
        data = json.load(data_file)

        def select_keys_from_properties(local):

            return {
                "name": local["name"],
                "geocode": local["code"],
                "year": "2016",
                "parent_level": "district",
                "long_name": local["name"],
                "geo_level": "local",
                "parent_code": local["parent_code"],
            }

        properties = list(
            map(
                lambda f: select_keys_from_properties(f["properties"]), data["features"]
            )
        )

        # print(properties)
        # print("Count: ", len(properties))

        # import pdb
        # pdb.set_trace()

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
    inputjson = ""
    outputcsv = ""
    try:
        opts, args = getopt.getopt(args, "hi:o:", ["inputjson=", "outputcsv="])
    except getopt.GetoptError:
        print("python local_geojson_to_csv.py -i <inputjson> -o <outputcsv>")
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print("python local_geojson_to_csv.py -i <inputjson> -o <outputcsv>")
            sys.exit()
        elif opt in ("-i", "--inputjson"):
            inputjson = arg
        elif opt in ("-o", "--outputcsv"):
            outputcsv = arg

    convert_csv(inputjson, outputcsv)


if __name__ == "__main__":
    main(sys.argv[1:])
