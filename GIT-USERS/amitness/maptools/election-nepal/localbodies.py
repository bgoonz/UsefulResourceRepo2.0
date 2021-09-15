import csv
import getopt

import sys

from shared import geoidmappings


def build_local_bodies(local_bodies_dict):
    if local_bodies_dict["District"] == "Total":
        geo_level = "country"
        geo_code = "NP"
    else:
        geo_level = "district"
        geo_code = geoidmappings.names_to_geo_ids[local_bodies_dict["District"]]
    return [
        {
            "geo_level": geo_level,
            "geo_code": geo_code,
            "body_type": "Gaupalika",
            "total": int(local_bodies_dict["Gaupalika"])
            if local_bodies_dict["Gaupalika"]
            else 0,
        },
        {
            "geo_level": geo_level,
            "geo_code": geo_code,
            "body_type": "Nagarpalika",
            "total": int(local_bodies_dict["Nagarpalika"])
            if local_bodies_dict["Nagarpalika"]
            else 0,
        },
        {
            "geo_level": geo_level,
            "geo_code": geo_code,
            "body_type": "Upa Mahanarpalika",
            "total": int(local_bodies_dict["Upa Mahanarpalika"])
            if local_bodies_dict["Upa Mahanarpalika"]
            else 0,
        },
        {
            "geo_level": geo_level,
            "geo_code": geo_code,
            "body_type": "Mahanarpalika",
            "total": int(local_bodies_dict["Mahanarpalika"])
            if local_bodies_dict["Mahanarpalika"]
            else 0,
        },
    ]


def convert_csv(inputfile, outputfile):
    print("Input file: {}\nOutput file: {}".format(inputfile, outputfile))
    with open(inputfile, "r") as data, open(outputfile, "w") as csv_out:
        reader = csv.DictReader(data)
        local_bodies_data = [
            row
            for local_bodies_lists in [build_local_bodies(row) for row in reader]
            for row in local_bodies_lists
        ]
        csv_keys = local_bodies_data[0].keys()
        writer = csv.DictWriter(csv_out, fieldnames=csv_keys)
        writer.writeheader()
        for row in local_bodies_data:
            writer.writerow(row)


def main(args):
    inputfile = ""
    outputfile = ""
    try:
        opts, args = getopt.getopt(args, "hi:o:", ["inputfile=", "outputfile="])
    except getopt.GetoptError:
        print("python localbodies.py -i <inputfile> -o <outputfile> ")
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print("python localbodies.py -i <inputfile> -o <outputfile>")
            sys.exit()
        elif opt in ("-i", "--inputfile"):
            inputfile = arg
        elif opt in ("-o", "--outputfile"):
            outputfile = arg

    convert_csv(inputfile, outputfile)

    print("Done!")


if __name__ == "__main__":
    main(sys.argv[1:])
