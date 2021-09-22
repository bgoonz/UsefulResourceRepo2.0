import csv
import getopt
import sys
from itertools import groupby
from operator import itemgetter
from shared import geoidmappings


def national_totals(district_rows):
    totals = []
    getter = itemgetter("sex")
    for key, group in groupby(sorted(district_rows, key=getter), getter):
        totals.append(
            {
                "geo_level": "country",
                "geo_code": "NP",
                "sex": key,
                "total": sum(map(lambda i: i["total"], group)),
            }
        )

    return totals


def convert_csv(input_file, output_file):
    district_rows = []
    with open(input_file, "r") as data:
        reader = csv.DictReader(data)
        for row in reader:
            geo_code = geoidmappings.names_to_geo_ids[row["district"]]
            female_count = int(row["FEMALE"])
            male_count = int(row["MALE"])
            district_rows.append(
                {
                    "geo_level": "district",
                    "geo_code": geo_code,
                    "sex": "female",
                    "total": female_count,
                }
            )
            district_rows.append(
                {
                    "geo_level": "district",
                    "geo_code": geo_code,
                    "sex": "male",
                    "total": male_count,
                }
            )

    all_rows = district_rows + national_totals(district_rows)
    sorted_rows = sorted(all_rows, key=lambda x: x.get("geo_code"))
    with open(output_file, "w") as csv_out:
        csv_keys = sorted_rows[0].keys()
        writer = csv.DictWriter(csv_out, fieldnames=csv_keys)
        writer.writeheader()
        for row in sorted_rows:
            writer.writerow(row)

    print("Done!")


def main(args):
    indir = ""
    outputcsv = ""
    try:
        opts, args = getopt.getopt(args, "hi:o:", ["indir=", "outputcsv="])
    except getopt.GetoptError:
        print("python pop_projections.py -i <indir> -o <outputcsv>")
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print("python pop_projections.py -i <indir> -o <outputcsv>")
            sys.exit()
        elif opt in ("-i", "--indir"):
            indir = arg
        elif opt in ("-o", "--outputcsv"):
            outputcsv = arg

    convert_csv(indir, outputcsv)


if __name__ == "__main__":
    main(sys.argv[1:])
