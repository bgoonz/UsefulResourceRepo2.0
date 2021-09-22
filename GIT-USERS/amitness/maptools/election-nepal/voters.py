import csv
import getopt

import sys

from shared import geoidmappings


def voter_totals(voter_dict):
    if voter_dict["District"] == "Total":
        geo_level = "country"
        geo_code = "NP"
    else:
        geo_level = "district"
        geo_code = geoidmappings.names_to_geo_ids[voter_dict["District"]]
    return [
        {
            "geo_level": geo_level,
            "geo_code": geo_code,
            "sex": "female",
            "total": int(voter_dict["Female"]) if voter_dict["Female"] else 0,
        },
        {
            "geo_level": geo_level,
            "geo_code": geo_code,
            "sex": "male",
            "total": int(voter_dict["Male"]) if voter_dict["Male"] else 0,
        },
        {
            "geo_level": geo_level,
            "geo_code": geo_code,
            "sex": "third gender",
            "total": int(voter_dict["Third Gender"])
            if voter_dict["Third Gender"]
            else 0,
        },
    ]


def convert_csv(inputfile, outputfile):
    print("Input file: {}\nOutput file: {}".format(inputfile, outputfile))
    with open(inputfile, "r") as data, open(outputfile, "w") as csv_out:
        reader = csv.DictReader(data)
        voter_data = [
            row
            for voter_lists in [voter_totals(row) for row in reader]
            for row in voter_lists
        ]
        csv_keys = voter_data[0].keys()
        writer = csv.DictWriter(csv_out, fieldnames=csv_keys)
        writer.writeheader()
        for row in voter_data:
            writer.writerow(row)


def main(args):
    inputfile = ""
    outputfile = ""
    try:
        opts, args = getopt.getopt(args, "hi:o:", ["inputfile=", "outputfile="])
    except getopt.GetoptError:
        print("python voters.py -i <inputfile> -o <outputfile> ")
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print("python voters.py -i <inputfile> -o <outputfile>")
            sys.exit()
        elif opt in ("-i", "--inputfile"):
            inputfile = arg
        elif opt in ("-o", "--outputfile"):
            outputfile = arg

    convert_csv(inputfile, outputfile)

    print("Done!")


if __name__ == "__main__":
    main(sys.argv[1:])
