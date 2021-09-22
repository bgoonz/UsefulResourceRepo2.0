import getopt
import csv
import json
import re
import sys


def main(args):
    indir = ""
    outputcsv = ""
    outjson = []
    try:
        opts, args = getopt.getopt(args, "hi:o:", ["indir=", "outputcsv="])
    except getopt.GetoptError:
        print("python vdc_to_csv.py -i <indir> -o <outputcsv>")
        sys.exit(2)

    for opt, arg in opts:
        if opt == "-h":
            print("python vdc_to_csv.py -i <indir> -o <outputcsv>")
            sys.exit()
        elif opt in ("-i", "--indir"):
            indir = arg
        elif opt in ("-o", "--outputcsv"):
            outputcsv = arg

    with open(indir, "r") as data_file:
        data = json.load(data_file)

        # import pdb
        # pdb.set_trace()

        for feature in data["features"]:
            outjson.append(
                {
                    feature["properties"]["name"].title(): "dis-"
                    + feature["properties"]["code"]
                }
            )

    print(outjson)


if __name__ == "__main__":
    main(sys.argv[1:])
