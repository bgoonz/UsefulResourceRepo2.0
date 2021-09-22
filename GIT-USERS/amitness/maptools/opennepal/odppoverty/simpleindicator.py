import csv
import getopt
from operator import itemgetter
from shared import geoidmappings
import sys


def build_district_row(indicator):
    def build_row(data_in):
        return {
            "geo_level": "district",
            "geo_code": geoidmappings.names_to_geo_ids[data_in["District"]],
            indicator: float(data_in["Value"]),
        }

    return build_row


def convert_csv(indicatorfile, indicator, rowname, nationalvalue, outputfile):
    print("Input file: {}, \nOutput file: {}".format(indicatorfile, outputfile))
    indicator_keys = ["District", "Sub Group", "Value"]
    with open(indicatorfile, "r") as indicator_data:
        indicator_reader = csv.DictReader(indicator_data)

        indicator_dicts = [
            {desired_key: row[desired_key] for desired_key in indicator_keys}
            for row in indicator_reader
            if row["Sub Group"] == indicator
        ]
        indicator_dicts.sort(key=itemgetter("District"))

        data_rows = list(map(build_district_row(rowname), indicator_dicts))
        data_rows.append(
            {"geo_level": "country", "geo_code": "NP", rowname: float(nationalvalue)}
        )
    with open(outputfile, "w") as csv_out:
        csv_keys = data_rows[0].keys()
        writer = csv.DictWriter(csv_out, fieldnames=csv_keys)
        writer.writeheader()
        for row in data_rows:
            writer.writerow(row)


def main(args):
    indicatorfile = ""
    indicator = ""
    rowname = ""
    nationalvalue = ""
    outputfile = ""
    try:
        opts, args = getopt.getopt(
            args,
            "hi:m:n:p:o:",
            [
                "indicatorfile=",
                "indicator=",
                "rowname=",
                "nationalvalue=",
                "outputfile=",
            ],
        )
    except getopt.GetoptError:
        print(
            "python povertyindicators.py -i <indicatorfile> -m <indicator> "
            "-n <rowname> -p <nationalvalue> -o <outputfile> "
        )
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print(
                "python povertyindicators.py -i <indicatorfile> "
                "-m <indicator> -n <rowname> -o <outputfile>"
            )
            sys.exit()
        elif opt in ("-i", "--indicatorfile"):
            indicatorfile = arg
        elif opt in ("-m", "--indicator"):
            indicator = arg
        elif opt in ("-n", "--rowname"):
            rowname = arg
        elif opt in ("-p", "--nationalvalue"):
            nationalvalue = arg
        elif opt in ("-o", "--outputfile"):
            outputfile = arg

    convert_csv(indicatorfile, indicator, rowname, nationalvalue, outputfile)

    print("Done!")


if __name__ == "__main__":
    main(sys.argv[1:])
