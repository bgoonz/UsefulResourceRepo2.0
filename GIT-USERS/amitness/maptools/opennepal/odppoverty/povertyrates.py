import csv
import getopt
from itertools import groupby
from operator import itemgetter
from shared import geoidmappings
import sys


def poverty_pop(percent_dict):
    geo_code = geoidmappings.names_to_geo_ids[percent_dict["District"]]
    total_pop = int(float(percent_dict["Population"]))
    pov_percent = round(float(percent_dict["Poverty Incidence"]), 5)
    in_poverty = int(total_pop * pov_percent)
    not_in_poverty = total_pop - in_poverty
    return [
        {
            "geo_level": "district",
            "geo_code": geo_code,
            "poverty": "IN_POVERTY",
            "total": in_poverty,
        },
        {
            "geo_level": "district",
            "geo_code": geo_code,
            "poverty": "NOT_IN_POVERTY",
            "total": not_in_poverty,
        },
    ]


def national_totals(district_rows):
    getter = itemgetter("poverty")
    return [
        {
            "geo_level": "country",
            "geo_code": "NP",
            "poverty": key,
            "total": sum(map(lambda i: i["total"], group)),
        }
        for key, group in groupby(sorted(district_rows, key=getter), getter)
    ]


def convert_csv(inputfile, outputfile):
    print("Input file: {}, \nOutput file: {}".format(inputfile, outputfile))
    desired_keys = ["District", "Indicators", "Value"]
    with open(inputfile, "r") as data:
        reader = csv.DictReader(data)

        desired_rows = [
            {desired_key: row[desired_key] for desired_key in desired_keys}
            for row in reader
            if row["Year AD"] == "2011"
            and (
                row["Indicators"] == "Population"
                or row["Indicators"] == "Poverty Incidence"
            )
        ]

        desired_rows.sort(key=itemgetter("District"))

    blended_rows = []
    for key, group in groupby(desired_rows, lambda row: row["District"]):
        pair = list(group)
        blended = {"District": key}
        for item in pair:
            blended[item["Indicators"]] = item["Value"]
        blended_rows.append(blended)

    district_rows = [
        item for sublist in list(map(poverty_pop, blended_rows)) for item in sublist
    ]

    all_rows = district_rows + national_totals(district_rows)
    sorted_rows = sorted(all_rows, key=lambda x: (x.get("geo_code"), x.get("poverty")))

    with open(outputfile, "w") as csv_out:
        csv_keys = sorted_rows[0].keys()
        writer = csv.DictWriter(csv_out, fieldnames=csv_keys)
        writer.writeheader()
        for row in sorted_rows:
            writer.writerow(row)


def main(args):
    inputfile = ""
    outputfile = ""
    try:
        opts, args = getopt.getopt(args, "hi:o:", ["inputfile=", "outputfile="])
    except getopt.GetoptError:
        print("python povertyrates.py -i <inputfile> -o <outputfile> ")
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print("python povertyrates.py -i <inputfile> -o <outputfile>")
            sys.exit()
        elif opt in ("-i", "--inputfile"):
            inputfile = arg
        elif opt in ("-o", "--outputfile"):
            outputfile = arg

    convert_csv(inputfile, outputfile)

    print("Done!")


if __name__ == "__main__":
    main(sys.argv[1:])
