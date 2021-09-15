import csv
import getopt
import sys
from collections import namedtuple
from itertools import groupby
from operator import itemgetter

from shared import geoidmappings


ElectionResults = namedtuple(
    "ElectionResults",
    ["district", "localbodies", "cpn", "congress", "maoist", "rpp", "others"],
)


def results_for_district(results_tuple):
    local_bodies = int(results_tuple.localbodies)
    geo_code = geoidmappings.names_to_geo_ids[results_tuple.district]
    party_results = [
        {
            "geo_level": "district",
            "geo_code": geo_code,
            "party": "CPN-UML",
            "total": int(results_tuple.cpn) if results_tuple.cpn else 0,
        },
        {
            "geo_level": "district",
            "geo_code": geo_code,
            "party": "Nepali Congress",
            "total": int(results_tuple.congress) if results_tuple.congress else 0,
        },
        {
            "geo_level": "district",
            "geo_code": geo_code,
            "party": "Maoist Kendra",
            "total": int(results_tuple.maoist) if results_tuple.maoist else 0,
        },
        {
            "geo_level": "district",
            "geo_code": geo_code,
            "party": "Rastriya Prajatantra Party",
            "total": int(results_tuple.rpp) if results_tuple.rpp else 0,
        },
        {
            "geo_level": "district",
            "geo_code": geo_code,
            "party": "Others",
            "total": int(results_tuple.others) if results_tuple.others else 0,
        },
    ]
    winners = sum([item["total"] for item in party_results])

    if (local_bodies - winners) < 0:
        print(
            "Discrepancy for {}, number of local bodies ({}) is less than winners: ({})".format(
                results_tuple.district, local_bodies, winners
            )
        )

    return party_results


def national_totals(district_rows):
    getter = itemgetter("party")
    return [
        {
            "geo_level": "country",
            "geo_code": "NP",
            "party": key,
            "total": sum(map(lambda i: i["total"], group)),
        }
        for key, group in groupby(sorted(district_rows, key=getter), getter)
    ]


def convert_csv(inputfile, mayoraloutput, deputyoutput):
    print(
        "input: {},\nmayoralout: {},\ndeputyout:{}".format(
            inputfile, mayoraloutput, deputyoutput
        )
    )
    with open(inputfile, "r") as data, open(mayoraloutput, "w") as mayor_out, open(
        deputyoutput, "w"
    ) as deputy_out:
        csv_keys = ["geo_level", "geo_code", "party", "total"]
        reader = csv.reader(data)
        csv_rows = [row for row in reader][3:]
        print("Getting Mayor data")
        district_mayoral_data = [
            district_item
            for district_list in [
                results_for_district(
                    ElectionResults(
                        row[0], row[2], row[3], row[5], row[7], row[9], row[11]
                    )
                )
                for row in csv_rows
            ]
            for district_item in district_list
        ]
        print("Getting Deputy Mayor data")
        district_deputy_mayoral_data = [
            district_item
            for district_list in [
                results_for_district(
                    ElectionResults(
                        row[0], row[2], row[4], row[6], row[8], row[10], row[12]
                    )
                )
                for row in csv_rows
            ]
            for district_item in district_list
        ]
        all_mayoral = national_totals(district_mayoral_data) + district_mayoral_data
        all_deputy_mayoral = (
            national_totals(district_deputy_mayoral_data) + district_deputy_mayoral_data
        )
        mayor_writer = csv.writer(mayor_out)
        mayor_writer.writerow(csv_keys)
        for row in all_mayoral:
            mayor_writer.writerow(
                [row["geo_level"], row["geo_code"], row["party"], row["total"]]
            )
        deputy_writer = csv.writer(deputy_out)
        deputy_writer.writerow(csv_keys)
        for row in all_deputy_mayoral:
            deputy_writer.writerow(
                [row["geo_level"], row["geo_code"], row["party"], row["total"]]
            )

    b = "b"


def main(args):
    inputfile = ""
    mayoraloutput = ""
    deputyoutput = ""
    try:
        opts, args = getopt.getopt(
            args, "hi:m:d:", ["inputfile=", "mayoraloutput=", "deputyoutput="]
        )
    except getopt.GetoptError:
        print(
            "python localbodies.py "
            "-i <inputfile> "
            "-m <mayoraloutput>  "
            "-d <deputyoutput> "
        )
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print(
                "python localbodies.py "
                "-i <inputfile> "
                "-m <mayoraloutput> "
                "-d <deputyoutput> "
            )
            sys.exit()
        elif opt in ("-i", "--inputfile"):
            inputfile = arg
        elif opt in ("-m", "--mayoraloutput"):
            mayoraloutput = arg
        elif opt in ("-d", "--deputyoutput"):
            deputyoutput = arg

    convert_csv(inputfile, mayoraloutput, deputyoutput)

    print("Done!")


if __name__ == "__main__":
    main(sys.argv[1:])
