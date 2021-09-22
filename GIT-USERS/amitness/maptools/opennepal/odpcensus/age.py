import csv
import getopt
from itertools import groupby
from operator import itemgetter
from shared import geoidmappings
import sys


def national_totals(district_rows):
    age_by_sex_getter = itemgetter("age in completed years", "sex")
    return [
        {
            "geo_level": "country",
            "geo_code": "NP",
            "age in completed years": key[0],
            "sex": key[1],
            "total": sum(map(lambda i: i["total"], group)),
        }
        for key, group in groupby(
            sorted(district_rows, key=age_by_sex_getter), age_by_sex_getter
        )
    ]


def district_age_totals(age_dict):
    age = int(age_dict["Age-Group"].split()[0])
    geo_code = geoidmappings.names_to_geo_ids[age_dict["District"]]
    return [
        {
            "geo_level": "district",
            "geo_code": geo_code,
            "age in completed years": age,
            "sex": "female",
            "total": int(age_dict["Female"]) if age_dict["Female"] else 0,
        },
        {
            "geo_level": "district",
            "geo_code": geo_code,
            "age in completed years": age,
            "sex": "male",
            "total": int(age_dict["Male"]) if age_dict["Male"] else 0,
        },
    ]


def convert_csv(inputfile, outputfile):
    print("Input file: {}\nOutput file: {}".format(inputfile, outputfile))
    desired_keys = ["District", "Age-Group", "Male", "Female"]
    with open(inputfile, "r") as data:
        reader = csv.DictReader(data)
        district_data = [
            row
            for district_age_lists in [
                district_age_totals(
                    {desired_key: row[desired_key] for desired_key in desired_keys}
                )
                for row in reader
            ]
            for row in district_age_lists
        ]

        national_data = national_totals(district_data)

        all_data = sorted(
            national_data + district_data,
            key=lambda r: "{}{}{}".format(r["geo_level"], r["geo_code"], r["total"]),
        )

    with open(outputfile, "w") as csv_out:
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
        print("python age.py -i <inputfile> -o <outputfile> ")
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print("python age.py -i <inputfile> -o <outputfile>")
            sys.exit()
        elif opt in ("-i", "--inputfile"):
            inputfile = arg
        elif opt in ("-o", "--outputfile"):
            outputfile = arg

    convert_csv(inputfile, outputfile)

    print("Done!")


if __name__ == "__main__":
    main(sys.argv[1:])
