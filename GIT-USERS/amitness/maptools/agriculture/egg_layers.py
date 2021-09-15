import csv
import getopt
import sys
from collections import namedtuple
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/..")

from shared import geoidmappings


egg_layers = ["hens", "ducks"]

COLUMNS = {"district_code": 0, "district_name": 0, "hens": 1, "ducks": 2}

ConvertedRow = namedtuple(
    "ConvertedRow", ["district_code", "district_name"] + egg_layers
)


def national_totals(district_rows):
    group = [row for row in district_rows]

    # find any missing districts
    all_districts = set([val for _, val in geoidmappings.names_to_geo_ids.items()])

    districts_with_data = set([row["geo_code"] for row in district_rows])

    if len(all_districts - districts_with_data):
        print("Districts without data:{0}".format(all_districts - districts_with_data))

    nationals = {"geo_level": "country", "geo_code": "NP"}
    nationals.update(
        {key: sum(map(lambda i: int(i[key]), group)) for key in egg_layers}
    )
    return [nationals]


def layers_for_district(layer_row_tuple):
    name_title = layer_row_tuple.district_name.strip().title()
    if name_title not in geoidmappings.names_to_geo_ids:
        print("Unknown district:{0}".format(name_title))
        return []

    geo_code = geoidmappings.names_to_geo_ids[
        layer_row_tuple.district_name.strip().title().strip("\n")
    ]
    district = {"geo_code": geo_code, "geo_level": "district"}
    district.update({k: getattr(layer_row_tuple, k) for k in egg_layers})
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
            for district_layers in [
                layers_for_district(
                    ConvertedRow(
                        row[COLUMNS["district_code"]],
                        row[COLUMNS["district_name"]],
                        int(round(float(get_cell_number(row[COLUMNS["hens"]])))),
                        int(round(float(get_cell_number(row[COLUMNS["ducks"]])))),
                    )
                )
                for row in csv_rows
                if row[COLUMNS["district_code"]]
            ]
            for row in district_layers
        ]

        csv_keys = ["geo_code", "geo_level", "egg_layer", "total"]
        writer = csv.writer(csv_out)
        writer.writerow(csv_keys)
        sorted_districts = sorted(district_data, key=lambda x: x.get("geo_code"))
        for row in national_totals(district_data) + sorted_districts:
            csv_rows = map(
                lambda layertype: [
                    row["geo_code"],
                    row["geo_level"],
                    layertype.upper(),
                    row[layertype],
                ],
                egg_layers,
            )
            for csv_row in csv_rows:
                writer.writerow(csv_row)


def main(args):
    inputfile = ""
    outputfile = ""
    try:
        opts, args = getopt.getopt(args, "hi:o:", ["inputfile=", "outputfile="])
    except getopt.GetoptError:
        print("python egg_layers.py " "-i <inputfile> " "-o <outputfile> ")
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print("python egg_layers.py " "-i <inputfile> " "-o <outputfile> ")
            sys.exit()
        elif opt in ("-i", "--inputfile"):
            inputfile = arg
        elif opt in ("-o", "--outputfile"):
            outputfile = arg

    convert_csv(inputfile, outputfile)

    print("Done!")


if __name__ == "__main__":
    main(sys.argv[1:])
