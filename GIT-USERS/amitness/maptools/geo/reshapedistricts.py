import getopt
import json
from os import path
import sys

"""
Utility for transforming geo data into the correct format for district.geojson
in nepalmap
"""


def reshapedistricts(infilename, outfilename):
    print("Reading from {} and writing to {}".format(infilename, outfilename))
    if not path.isfile(infilename):
        print("No such file: {}".format(infilename))
        sys.exit(1)

    def transformfeature(oldfeature):
        description = oldfeature["properties"]["Description"]
        cleaned = (
            description.replace('<div class="googft-info-window">', "")
            .replace("<b>", "")
            .replace("</b>", "")
            .replace("<br>", "")
            .replace("</div>", "")
        )
        district_name = cleaned.split("DIST_NAME: ", 1)[1].split(" ", 1)[0]
        code = cleaned.split("DIST_CODE: ", 1)[1][:2]
        properties = {
            "name": district_name,
            "code": code,
            "level": "district",
            "geoid": "district-{}".format(code),
        }
        return {
            "type": oldfeature["type"],
            "geometry": oldfeature["geometry"],
            "properties": properties,
        }

    with open(infilename, "r") as infile, open(outfilename, "w") as outfile:
        old_data = json.load(infile)
        new_data = {
            "type": old_data["type"],
            "features": list(map(transformfeature, old_data["features"])),
        }
        json.dump(new_data, outfile)

    print("Done!")


def main(args):
    ifile = ""
    ofile = ""
    try:
        opts, args = getopt.getopt(args, "hi:o:", ["ifile=", "ofile="])
    except getopt.GetoptError:
        print("python reshapedistricts.py -i <ifile> -o <ofile>")
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print("python reshapedistricts.py -i <ifile>  -o <ofile>")
            sys.exit()
        elif opt in ("-i", "--ifile"):
            ifile = arg
        elif opt in ("-o", "--ofile"):
            ofile = arg

    reshapedistricts(ifile, ofile)


if __name__ == "__main__":
    main(sys.argv[1:])
