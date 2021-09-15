import csv
import getopt
import sys
from collections import namedtuple

from shared import geoidmappings


meat_types = ["buff", "mutton", "chevon", "pork", "chicken", "duck"]

COLUMNS = {
    "district_code": 0,
    "district_name": 0,
    "buff": 1,
    "mutton": 2,
    "chevon": 3,
    "pork": 4,
    "chicken": 5,
    "duck": 6,
    "total": 7,
}

ConvertedRow = namedtuple(
    "ConvertedRow", ["district_code", "district_name"] + meat_types + ["total"]
)


def national_totals(district_rows):
    group = [row for row in district_rows]

    # find any missing districts
    all_districts = set([val for _, val in geoidmappings.names_to_geo_ids.iteritems()])

    districts_with_data = set([row["geo_code"] for row in district_rows])

    if len(all_districts - districts_with_data):
        print("Districts without data:{0}".format(all_districts - districts_with_data))

    nationals = {"geo_level": "country", "geo_code": "NP"}
    nationals.update(
        {key: sum(map(lambda i: int(i[key]), group)) for key in meat_types + ["total"]}
    )
    return [nationals]


def meats_for_district(meat_row_tuple):
    geo_level = "district"
    name_title = meat_row_tuple.district_name.title()
    if name_title not in geoidmappings.names_to_geo_ids:
        print("Unknown district:{0}".format(name_title))
        return []

    geo_code = geoidmappings.names_to_geo_ids[
        meat_row_tuple.district_name.title().strip("\n")
    ]
    district = {"geo_code": geo_code, "geo_level": geo_level}
    district.update({k: getattr(meat_row_tuple, k) for k in meat_types + ["total"]})
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
            for district_meats in [
                meats_for_district(
                    ConvertedRow(
                        row[COLUMNS["district_code"]],
                        row[COLUMNS["district_name"]],
                        get_cell_number(row[COLUMNS["buff"]]),
                        get_cell_number(row[COLUMNS["mutton"]]),
                        get_cell_number(row[COLUMNS["chevon"]]),
                        get_cell_number(row[COLUMNS["pork"]]),
                        get_cell_number(row[COLUMNS["chicken"]]),
                        get_cell_number(row[COLUMNS["duck"]]),
                        get_cell_number(row[COLUMNS["total"]]),
                    )
                )
                for row in csv_rows
                if row[COLUMNS["district_code"]]
            ]
            for row in district_meats
        ]

        csv_keys = ["geo_code", "geo_level", "meat", "total"]
        writer = csv.writer(csv_out)
        writer.writerow(csv_keys)
        for row in national_totals(district_data) + district_data:
            csv_rows = map(
                lambda meattype: [
                    row["geo_code"],
                    row["geo_level"],
                    meattype.upper(),
                    row[meattype],
                ],
                meat_types,
            )
            for csv_row in csv_rows:
                writer.writerow(csv_row)
            writer.writerow([row["geo_code"], row["geo_level"], "TOTAL", row["total"]])


def main(args):
    inputfile = ""
    outputfile = ""
    try:
        opts, args = getopt.getopt(args, "hi:o:", ["inputfile=", "outputfile="])
    except getopt.GetoptError:
        print("python deliveries.py " "-i <inputfile> " "-o <outputfile> ")
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print("python deliveries.py " "-i <inputfile> " "-o <outputfile> ")
            sys.exit()
        elif opt in ("-i", "--inputfile"):
            inputfile = arg
        elif opt in ("-o", "--outputfile"):
            outputfile = arg

    convert_csv(inputfile, outputfile)

    print("Done!")


if __name__ == "__main__":
    main(sys.argv[1:])
