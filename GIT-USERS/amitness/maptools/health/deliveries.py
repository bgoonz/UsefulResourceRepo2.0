import csv
import getopt

import sys
from collections import namedtuple

from shared import geoidmappings


COLUMNS = {
    "district_code": 0,
    "district_name": 1,
    "sba_at_facility": 2,
    "sba_at_home": 3,
    "health_worker_at_facility": 5,
    "health_worker_at_home": 6,
}

DeliveryRow = namedtuple(
    "DeliveryRow",
    [
        "district_code",
        "district_name",
        "sba_at_facility",
        "sba_at_home",
        "health_worker_at_facility",
        "health_worker_at_home",
    ],
)


def deliveries_for_district(delivery_row_tuple):
    geo_level = "district"
    geo_code = geoidmappings.names_to_geo_ids[delivery_row_tuple.district_name.title()]
    return [
        {
            "geo_code": geo_code,
            "geo_level": geo_level,
            "delivery_type": "SBA_AT_FACILITY",
            "total": delivery_row_tuple.sba_at_facility,
        },
        {
            "geo_code": geo_code,
            "geo_level": geo_level,
            "delivery_type": "SBA_AT_HOME",
            "total": delivery_row_tuple.sba_at_home,
        },
        {
            "geo_code": geo_code,
            "geo_level": geo_level,
            "delivery_type": "HEALTH_WORKER_AT_FACILITY",
            "total": delivery_row_tuple.health_worker_at_facility,
        },
        {
            "geo_code": geo_code,
            "geo_level": geo_level,
            "delivery_type": "HEALTH_WORKER_AT_HOME",
            "total": delivery_row_tuple.health_worker_at_home,
        },
    ]


def convert_csv(inputfile, outputfile):
    print("Input file: {}\nOutput file: {}".format(inputfile, outputfile))
    with open(inputfile, "r") as data, open(outputfile, "w") as csv_out:
        reader = csv.reader(data)
        csv_rows = [row for row in reader][1:]
        district_data = [
            row
            for district_deliveries in [
                deliveries_for_district(
                    DeliveryRow(
                        row[COLUMNS["district_code"]],
                        row[COLUMNS["district_name"]],
                        row[COLUMNS["sba_at_facility"]],
                        row[COLUMNS["sba_at_home"]],
                        row[COLUMNS["health_worker_at_facility"]],
                        row[COLUMNS["health_worker_at_home"]],
                    )
                )
                for row in csv_rows
                if row[COLUMNS["district_code"]]
            ]
            for row in district_deliveries
        ]
        national_row = [
            DeliveryRow(
                row[COLUMNS["district_code"]],
                row[COLUMNS["district_name"]],
                row[COLUMNS["sba_at_facility"]],
                row[COLUMNS["sba_at_home"]],
                row[COLUMNS["health_worker_at_facility"]],
                row[COLUMNS["health_worker_at_home"]],
            )
            for row in csv_rows
            if row[COLUMNS["district_name"]] == "National Total"
        ][0]
        national_data = [
            {
                "geo_code": "NP",
                "geo_level": "country",
                "delivery_type": "SBA_AT_FACILITY",
                "total": national_row.sba_at_facility,
            },
            {
                "geo_code": "NP",
                "geo_level": "country",
                "delivery_type": "SBA_AT_HOME",
                "total": national_row.sba_at_home,
            },
            {
                "geo_code": "NP",
                "geo_level": "country",
                "delivery_type": "HEALTH_WORKER_AT_FACILITY",
                "total": national_row.health_worker_at_facility,
            },
            {
                "geo_code": "NP",
                "geo_level": "country",
                "delivery_type": "HEALTH_WORKER_AT_HOME",
                "total": national_row.health_worker_at_home,
            },
        ]
        csv_keys = ["geo_level", "geo_code", "delivery_type", "total"]
        writer = csv.writer(csv_out)
        writer.writerow(csv_keys)
        for row in national_data + district_data:
            writer.writerow(
                [row["geo_level"], row["geo_code"], row["delivery_type"], row["total"]]
            )


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
