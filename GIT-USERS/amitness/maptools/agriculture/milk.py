import csv
import getopt
import sys
from collections import namedtuple

from shared import geoidmappings


milk = ["cow_milk", "buffalo_milk"]

COLUMNS = {"district_code": 0, "district_name": 0, "cow_milk": 3, "buffalo_milk": 4}

ConvertedRow = namedtuple("ConvertedRow", ["district_code", "district_name"] + milk)


def national_totals(district_rows):
    group = [row for row in district_rows]

    # find any missing districts
    all_districts = set([val for _, val in geoidmappings.names_to_geo_ids.items()])

    districts_with_data = set([row["geo_code"] for row in district_rows])

    if len(all_districts - districts_with_data):
        print("Districts without data:{0}".format(all_districts - districts_with_data))

    nationals = {"geo_level": "country", "geo_code": "NP"}
    nationals.update({key: sum(map(lambda i: int(i[key]), group)) for key in milk})
    return [nationals]


def milk_for_district(milk_row_tuple):
    name_title = milk_row_tuple.district_name.strip().title()
    if name_title not in geoidmappings.names_to_geo_ids:
        print("Unknown district:{0}".format(name_title))
        return []

    geo_code = geoidmappings.names_to_geo_ids[
        milk_row_tuple.district_name.strip().title().strip("\n")
    ]
    district = {"geo_code": geo_code, "geo_level": "district"}
    district.update({k: getattr(milk_row_tuple, k) for k in milk})
    return [district]


def get_cell_number(cell):
    return cell if cell else "0"


def convert_csv(inputfile, outputfile):
    print("Input file: {}\nOutput file: {}".format(inputfile, outputfile))
    with open(inputfile, "r") as data, open(outputfile, "w") as csv_out:
        reader = csv.reader(data)
        csv_rows = [row for row in reader][1:]

        district_data = [
            row
            for district_milk in [
                milk_for_district(
                    ConvertedRow(
                        row[COLUMNS["district_code"]],
                        row[COLUMNS["district_name"]],
                        get_cell_number(row[COLUMNS["cow_milk"]]),
                        get_cell_number(row[COLUMNS["buffalo_milk"]]),
                    )
                )
                for row in csv_rows
                if row[COLUMNS["district_code"]]
            ]
            for row in district_milk
        ]

        csv_keys = ["geo_code", "geo_level", "milk_type", "total"]
        writer = csv.writer(csv_out)
        writer.writerow(csv_keys)
        sorted_districts = sorted(district_data, key=lambda x: x.get("geo_code"))
        for row in national_totals(district_data) + sorted_districts:
            csv_rows = map(
                lambda milktype: [
                    row["geo_code"],
                    row["geo_level"],
                    milktype.upper(),
                    row[milktype],
                ],
                milk,
            )
            for csv_row in csv_rows:
                writer.writerow(csv_row)


def main(args):
    inputfile = ""
    outputfile = ""
    try:
        opts, args = getopt.getopt(args, "hi:o:", ["inputfile=", "outputfile="])
    except getopt.GetoptError:
        print("python milk.py " "-i <inputfile> " "-o <outputfile> ")
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print("python milk.py " "-i <inputfile> " "-o <outputfile> ")
            sys.exit()
        elif opt in ("-i", "--inputfile"):
            inputfile = arg
        elif opt in ("-o", "--outputfile"):
            outputfile = arg

    convert_csv(inputfile, outputfile)

    print("Done!")


if __name__ == "__main__":
    main(sys.argv[1:])
