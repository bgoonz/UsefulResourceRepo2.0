import getopt
import csv
import json
import re
import sys


def main(args):
    inputjson = ""
    outputcsv = ""
    try:
        opts, args = getopt.getopt(args, "hi:o:", ["inputjson=", "outputcsv="])
    except getopt.GetoptError:
        print("python country_geojson_to_csv.py -i <ininputjsondir> -o <outputcsv>")
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print("python country_geojson_to_csv.py -i <inputjson> -o <outputcsv>")
            sys.exit()
        elif opt in ("-i", "--inputjson"):
            inputjson = arg
        elif opt in ("-o", "--outputcsv"):
            outputcsv = arg

    with open(inputjson, "r") as data_file:
        data = json.load(data_file)

        fieldnames = [
            "country",
            "region",
            "zone",
            "district_id",
            "district",
            "vdc_geo_code",
            "vdc",
        ]

        sorted_properties = sorted(
            properties,
            key=lambda elem: "%s %s %s %s"
            % (elem["region"], elem["zone"], elem["district_id"], elem["vdc"]),
        )

        with open(output_file, "w") as csv_out:
            writer = csv.DictWriter(csv_out, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(sorted_properties)

    print("Done!")


if __name__ == "__main__":
    main(sys.argv[1:])
