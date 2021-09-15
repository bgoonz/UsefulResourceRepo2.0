import csv
import getopt

import sys
from collections import namedtuple

from shared import geoidmappings


COLUMNS = {
    "district_code": 0,
    "district_name": 1,
    "antepartum": 2,
    "intrapartum": 3,
    "postpartum": 4,
}

MaternalDeathRow = namedtuple(
    "MaternalDeathRow",
    ["district_code", "district_name", "antepartum", "intrapartum", "postpartum"],
)


def deaths_for_district(maternal_death_row_tuple):
    geo_level = "district"
    geo_code = geoidmappings.names_to_geo_ids[
        maternal_death_row_tuple.district_name.title()
    ]
    return [
        {
            "geo_code": geo_code,
            "geo_level": geo_level,
            "maternal_death": "ANTEPARTUM",
            "total": maternal_death_row_tuple.antepartum,
        },
        {
            "geo_code": geo_code,
            "geo_level": geo_level,
            "maternal_death": "INTRAPARTUM",
            "total": maternal_death_row_tuple.intrapartum,
        },
        {
            "geo_code": geo_code,
            "geo_level": geo_level,
            "maternal_death": "POSTPARTUM",
            "total": maternal_death_row_tuple.postpartum,
        },
    ]


def convert_csv(inputfile, outputfile):
    print("Input file: {}\nOutput file: {}".format(inputfile, outputfile))
    with open(inputfile, "r") as data, open(outputfile, "w") as csv_out:
        reader = csv.reader(data)
        csv_rows = [row for row in reader][1:]
        district_data = [
            row
            for district_maternal_deaths in [
                deaths_for_district(
                    MaternalDeathRow(
                        row[COLUMNS["district_code"]],
                        row[COLUMNS["district_name"]],
                        row[COLUMNS["antepartum"]],
                        row[COLUMNS["intrapartum"]],
                        row[COLUMNS["postpartum"]],
                    )
                )
                for row in csv_rows
                if row[COLUMNS["district_code"]]
            ]
            for row in district_maternal_deaths
        ]
        national_row = [
            MaternalDeathRow(
                row[COLUMNS["district_code"]],
                row[COLUMNS["district_name"]],
                row[COLUMNS["antepartum"]],
                row[COLUMNS["intrapartum"]],
                row[COLUMNS["postpartum"]],
            )
            for row in csv_rows
            if row[COLUMNS["district_name"]] == "National Total"
        ][0]
        national_data = [
            {
                "geo_code": "NP",
                "geo_level": "country",
                "maternal_death": "ANTEPARTUM",
                "total": national_row.antepartum,
            },
            {
                "geo_code": "NP",
                "geo_level": "country",
                "maternal_death": "INTRAPARTUM",
                "total": national_row.intrapartum,
            },
            {
                "geo_code": "NP",
                "geo_level": "country",
                "maternal_death": "POSTPARTUM",
                "total": national_row.postpartum,
            },
        ]
        csv_keys = ["geo_level", "geo_code", "maternal_death", "total"]
        writer = csv.writer(csv_out)
        writer.writerow(csv_keys)
        for row in national_data + district_data:
            writer.writerow(
                [row["geo_level"], row["geo_code"], row["maternal_death"], row["total"]]
            )


def main(args):
    inputfile = ""
    outputfile = ""
    try:
        opts, args = getopt.getopt(args, "hi:o:", ["inputfile=", "outputfile="])
    except getopt.GetoptError:
        print("python maternaldeaths.py " "-i <inputfile> " "-o <outputfile> ")
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print("python maternaldeaths.py " "-i <inputfile> " "-o <outputfile> ")
            sys.exit()
        elif opt in ("-i", "--inputfile"):
            inputfile = arg
        elif opt in ("-o", "--outputfile"):
            outputfile = arg

    convert_csv(inputfile, outputfile)

    print("Done!")


if __name__ == "__main__":
    main(sys.argv[1:])
