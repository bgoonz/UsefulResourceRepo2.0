import csv
import getopt
import sys
from collections import namedtuple

from shared import geoidmappings


livestock = ["cattle", "buffaloes", "sheep", "goats", "pigs", "fowl", "ducks"]

COLUMNS = {
    "district_code": 0,
    "district_name": 0,
    "cattle": 1,
    "buffaloes": 2,
    "sheep": 3,
    "goats": 4,
    "pigs": 5,
    "fowl": 6,
    "ducks": 7,
}

ConvertedRow = namedtuple(
    "ConvertedRow", ["district_code", "district_name"] + livestock
)


def national_totals(district_rows):
    group = [row for row in district_rows]

    # find any missing districts
    all_districts = set([val for _, val in geoidmappings.names_to_geo_ids.items()])

    districts_with_data = set([row["geo_code"] for row in district_rows])

    if len(all_districts - districts_with_data):
        print("Districts without data:{0}".format(all_districts - districts_with_data))

    nationals = {"geo_level": "country", "geo_code": "NP"}
    nationals.update({key: sum(map(lambda i: int(i[key]), group)) for key in livestock})
    return [nationals]


def livestock_for_district(livestock_row_tuple):
    name_title = livestock_row_tuple.district_name.strip().title()
    if name_title not in geoidmappings.names_to_geo_ids:
        print("Unknown district:{0}".format(name_title))
        return []

    geo_code = geoidmappings.names_to_geo_ids[
        livestock_row_tuple.district_name.strip().title().strip("\n")
    ]
    district = {"geo_code": geo_code, "geo_level": "district"}
    district.update({k: getattr(livestock_row_tuple, k) for k in livestock})
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
            for district_livestock in [
                livestock_for_district(
                    ConvertedRow(
                        row[COLUMNS["district_code"]],
                        row[COLUMNS["district_name"]],
                        get_cell_number(row[COLUMNS["cattle"]]),
                        get_cell_number(row[COLUMNS["buffaloes"]]),
                        get_cell_number(row[COLUMNS["sheep"]]),
                        get_cell_number(row[COLUMNS["goats"]]),
                        get_cell_number(row[COLUMNS["pigs"]]),
                        get_cell_number(row[COLUMNS["fowl"]]),
                        get_cell_number(row[COLUMNS["ducks"]]),
                    )
                )
                for row in csv_rows
                if row[COLUMNS["district_code"]]
            ]
            for row in district_livestock
        ]

        csv_keys = ["geo_code", "geo_level", "livestock", "total"]
        writer = csv.writer(csv_out)
        writer.writerow(csv_keys)
        sorted_districts = sorted(district_data, key=lambda x: x.get("geo_code"))
        for row in national_totals(district_data) + sorted_districts:
            csv_rows = map(
                lambda livestocktype: [
                    row["geo_code"],
                    row["geo_level"],
                    livestocktype.upper(),
                    row[livestocktype],
                ],
                livestock,
            )
            for csv_row in csv_rows:
                writer.writerow(csv_row)


def main(args):
    inputfile = ""
    outputfile = ""
    try:
        opts, args = getopt.getopt(args, "hi:o:", ["inputfile=", "outputfile="])
    except getopt.GetoptError:
        print("python livestock.py " "-i <inputfile> " "-o <outputfile> ")
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print("python livestock.py " "-i <inputfile> " "-o <outputfile> ")
            sys.exit()
        elif opt in ("-i", "--inputfile"):
            inputfile = arg
        elif opt in ("-o", "--outputfile"):
            outputfile = arg

    convert_csv(inputfile, outputfile)

    print("Done!")


if __name__ == "__main__":
    main(sys.argv[1:])
