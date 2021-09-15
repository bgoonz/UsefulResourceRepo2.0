import csv
import getopt

import sys
from collections import namedtuple

from shared import geoidmappings


PollingStations = namedtuple("PollingStations", "place, pollingstations")


def polling_places(polling_places_tuple):
    if polling_places_tuple.place == "Total":
        geo_level = "country"
        geo_code = "NP"
    else:
        geo_level = "district"
        geo_code = geoidmappings.names_to_geo_ids[polling_places_tuple.place]
    return {
        "geo_level": geo_level,
        "geo_code": geo_code,
        "polling_places": int(polling_places_tuple.pollingstations.replace(",", ""))
        if polling_places_tuple.pollingstations
        else 0,
    }


def convert_csv(inputfile, outputfile):
    print("Input file: {}\nOutput file: {}".format(inputfile, outputfile))
    with open(inputfile, "r") as data, open(outputfile, "w") as csv_out:
        reader = csv.reader(data)
        csv_rows = [row for row in reader][1:]
        polling_place_data = [
            polling_places(PollingStations(row[1], row[3])) for row in csv_rows
        ]
        csv_keys = ["geo_level", "geo_code", "number of polling places"]
        writer = csv.writer(csv_out)
        writer.writerow(csv_keys)
        for row in polling_place_data:
            writer.writerow([row["geo_level"], row["geo_code"], row["polling_places"]])


def main(args):
    inputfile = ""
    outputfile = ""
    try:
        opts, args = getopt.getopt(args, "hi:o:", ["inputfile=", "outputfile="])
    except getopt.GetoptError:
        print("python pollingplaces.py -i <inputfile> -o <outputfile> ")
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print("python pollingplaces.py -i <inputfile> -o <outputfile>")
            sys.exit()
        elif opt in ("-i", "--inputfile"):
            inputfile = arg
        elif opt in ("-o", "--outputfile"):
            outputfile = arg

    convert_csv(inputfile, outputfile)

    print("Done!")


if __name__ == "__main__":
    main(sys.argv[1:])
