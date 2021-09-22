import csv
import getopt

import sys

from shared import geoidmappings


def national_totals(rows):
    forested = sum(map(lambda i: round(float(i["Forest land"])), rows))
    not_forested = sum(map(lambda i: round(float(i["Total Land"])), rows)) - forested
    return [
        {
            "geo_level": "country",
            "geo_code": "NP",
            "land use": "forested",
            "total": forested,
        },
        {
            "geo_level": "country",
            "geo_code": "NP",
            "land use": "not forested",
            "total": not_forested,
        },
    ]


def build_forestry_records(forestry_dict):
    geo_level = "district"
    geo_code = geoidmappings.names_to_geo_ids[forestry_dict["District"]]
    forested = round(float(forestry_dict["Forest land"]))
    not_forested = round(float(forestry_dict["Total Land"])) - forested
    return [
        {
            "geo_level": geo_level,
            "geo_code": geo_code,
            "land use": "forested",
            "total": forested,
        },
        {
            "geo_level": geo_level,
            "geo_code": geo_code,
            "land use": "not forested",
            "total": not_forested,
        },
    ]


def convert_csv(inputfile, outputfile):
    print("Input file: {}\nOutput file: {}".format(inputfile, outputfile))
    with open(inputfile, "r") as data, open(outputfile, "w") as csv_out:
        reader = csv.DictReader(data)
        reader_rows = [row for row in reader]
        district_data = [
            row
            for forestry_lists in [build_forestry_records(row) for row in reader_rows]
            for row in forestry_lists
        ]
        all_data = district_data + national_totals(reader_rows)
        csv_keys = all_data[0].keys()
        writer = csv.DictWriter(csv_out, fieldnames=csv_keys)
        writer.writeheader()
        for row in all_data:
            writer.writerow(row)


def main(args):
    inputfile = ""
    outputfile = ""
    try:
        opts, args = getopt.getopt(args, "hi:o:", ["inputfile=", "outputfile="])
    except getopt.GetoptError:
        print("python forestry.py -i <inputfile> -o <outputfile> ")
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print("python forestry.py -i <inputfile> -o <outputfile>")
            sys.exit()
        elif opt in ("-i", "--inputfile"):
            inputfile = arg
        elif opt in ("-o", "--outputfile"):
            outputfile = arg

    convert_csv(inputfile, outputfile)

    print("Done!")


if __name__ == "__main__":
    main(sys.argv[1:])
