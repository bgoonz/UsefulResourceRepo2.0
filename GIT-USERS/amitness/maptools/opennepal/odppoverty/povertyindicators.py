import csv
import getopt
from itertools import groupby
from operator import itemgetter
from shared import geoidmappings
import sys


def pops_for_indicator(rowname):
    def pops_for_row(percent_dict):
        in_condition = int(percent_dict["Population"] * percent_dict[rowname])
        not_in_condition = percent_dict["Population"] - in_condition
        return [
            {
                "geo_level": "district",
                "geo_code": percent_dict["District"],
                rowname: "NO",
                "total": in_condition,
            },
            {
                "geo_level": "district",
                "geo_code": percent_dict["District"],
                rowname: "YES",
                "total": not_in_condition,
            },
        ]

    return pops_for_row


def national_totals(district_rows, rowname):
    getter = itemgetter(rowname)
    return [
        {
            "geo_level": "country",
            "geo_code": "NP",
            rowname: key,
            "total": sum(map(lambda i: i["total"], group)),
        }
        for key, group in groupby(sorted(district_rows, key=getter), getter)
    ]


def convert_csv(populationfile, indicatorfile, indicator, rowname, outputfile):
    print("Input file: {}, \nOutput file: {}".format(populationfile, outputfile))
    pop_keys = ["District", "Indicators", "Value"]
    indicator_keys = ["District", "Sub Group", "Value"]
    with open(populationfile, "r") as pop_data, open(
        indicatorfile, "r"
    ) as indicator_data:
        pop_reader = csv.DictReader(pop_data)
        indicator_reader = csv.DictReader(indicator_data)

        population_dicts = [
            {desired_key: row[desired_key] for desired_key in pop_keys}
            for row in pop_reader
            if row["Year AD"] == "2011" and row["Indicators"] == "Population"
        ]

        indicator_dicts = [
            {desired_key: row[desired_key] for desired_key in indicator_keys}
            for row in indicator_reader
            if row["Sub Group"] == indicator
        ]

        population_dicts.sort(key=itemgetter("District"))
        indicator_dicts.sort(key=itemgetter("District"))

        pop_and_indicator_rows = []
        for key, group in groupby(population_dicts, lambda row: row["District"]):
            pop_dict = list(group)[0]
            indicator_dict = list(
                filter(lambda r: r["District"] == key, indicator_dicts)
            )[0]
            blended = {
                "District": geoidmappings.names_to_geo_ids[key],
                pop_dict["Indicators"]: int(float(pop_dict["Value"])),
                rowname: round(float(indicator_dict["Value"]) * 0.01, 3),
            }
            pop_and_indicator_rows.append(blended)

        district_rows = [
            item
            for sublist in list(
                map(pops_for_indicator(rowname), pop_and_indicator_rows)
            )
            for item in sublist
        ]

        all_rows = district_rows + national_totals(district_rows, rowname)

    sorted_rows = sorted(all_rows, key=lambda x: (x.get("geo_code"), x.get("poverty")))

    with open(outputfile, "w") as csv_out:
        csv_keys = sorted_rows[0].keys()
        writer = csv.DictWriter(csv_out, fieldnames=csv_keys)
        writer.writeheader()
        for row in sorted_rows:
            writer.writerow(row)


def main(args):
    populationfile = ""
    indicatorfile = ""
    indicator = ""
    rowname = ""
    outputfile = ""
    try:
        opts, args = getopt.getopt(
            args,
            "hi:d:m:n:o:",
            [
                "populationfile=",
                "indicatorfile=",
                "indicator=",
                "rowname=",
                "outputfile=",
            ],
        )
    except getopt.GetoptError:
        print(
            "python povertyindicators.py -i <populationfile> "
            "-d <indicatorfile> -m <indicator> -n <rowname> "
            "-o <outputfile> "
        )
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print(
                "python povertyindicators.py -i <populationfile> "
                "-d <indicatorfile>  -m <indicator> -n <rowname> "
                "-o <outputfile>"
            )
            sys.exit()
        elif opt in ("-i", "--populationfile"):
            populationfile = arg
        elif opt in ("-d", "--indicatorfile"):
            indicatorfile = arg
        elif opt in ("-m", "--indicator"):
            indicator = arg
        elif opt in ("-n", "--rowname"):
            rowname = arg
        elif opt in ("-o", "--outputfile"):
            outputfile = arg

    convert_csv(populationfile, indicatorfile, indicator, rowname, outputfile)

    print("Done!")


if __name__ == "__main__":
    main(sys.argv[1:])
