import csv
import getopt

import sys
from collections import namedtuple

from shared import geoidmappings


Parties = namedtuple("Parties", "place, parties")


def political_parties(parties_tuple):
    if parties_tuple.place == "Total":
        geo_level = "country"
        geo_code = "NP"
    else:
        geo_level = "district"
        geo_code = geoidmappings.names_to_geo_ids[parties_tuple.place]
    return {
        "geo_level": geo_level,
        "geo_code": geo_code,
        "registered_parties": int(parties_tuple.parties)
        if parties_tuple.parties
        else 0,
    }


def convert_csv(inputfile, outputfile):
    print("Input file: {}\nOutput file: {}".format(inputfile, outputfile))
    with open(inputfile, "r") as data, open(outputfile, "w") as csv_out:
        reader = csv.reader(data)
        csv_rows = [row for row in reader][1:]
        parties_data = [political_parties(Parties(*row)) for row in csv_rows]
        csv_keys = ["geo_level", "geo_code", "registered political parties"]
        writer = csv.writer(csv_out)
        writer.writerow(csv_keys)
        for row in parties_data:
            writer.writerow(
                [row["geo_level"], row["geo_code"], row["registered_parties"]]
            )


def main(args):
    inputfile = ""
    outputfile = ""
    try:
        opts, args = getopt.getopt(args, "hi:o:", ["inputfile=", "outputfile="])
    except getopt.GetoptError:
        print("python parties.py -i <inputfile> -o <outputfile> ")
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print("python parties.py -i <inputfile> -o <outputfile>")
            sys.exit()
        elif opt in ("-i", "--inputfile"):
            inputfile = arg
        elif opt in ("-o", "--outputfile"):
            outputfile = arg

    convert_csv(inputfile, outputfile)

    print("Done!")


if __name__ == "__main__":
    main(sys.argv[1:])
