import csv
import getopt

import sys
from collections import namedtuple

from shared import geoidmappings


LocationPercent = namedtuple("LocationPercent", ["location", "percent"])


def stat_dict(location_percent_tuple, stat_name):
    if location_percent_tuple.location == "National Total":
        geo_level = "country"
        geo_code = "NP"
    else:
        geo_level = "district"
        geo_code = geoidmappings.names_to_geo_ids[
            location_percent_tuple.location.title()
        ]
    return {
        "geo_level": geo_level,
        "geo_code": geo_code,
        stat_name: "{value:.{digits}f}".format(
            value=float(location_percent_tuple.percent), digits=2
        )
        if location_percent_tuple.percent
        else 0.0,
    }


def convert_csv(inputfile, outputfile, column_index, stat_name):
    print("Input file: {}\nOutput file: {}".format(inputfile, outputfile))
    with open(inputfile, "r") as data, open(outputfile, "w") as csv_out:
        reader = csv.reader(data)
        csv_rows = [row for row in reader][1:]
        parties_data = [
            stat_dict(LocationPercent(row[1], row[column_index]), stat_name)
            for row in csv_rows
            if row[0] or row[1] == "National Total"
        ]
        csv_keys = ["geo_level", "geo_code", stat_name]
        writer = csv.writer(csv_out)
        writer.writerow(csv_keys)
        for row in parties_data:
            writer.writerow([row["geo_level"], row["geo_code"], row[stat_name]])


def main(args):
    inputfile = ""
    outputfile = ""
    column_index = None
    stat_name = ""
    try:
        opts, args = getopt.getopt(
            args,
            "hi:o:c:s:",
            ["inputfile=", "outputfile=", "columnindex=", "statname="],
        )
    except getopt.GetoptError:
        print(
            "python locationpercent.py "
            "-i <inputfile> -o <outputfile> "
            "-c <columnindex> -s <statname> "
        )
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print(
                "python locationpercent.py "
                "-i <inputfile> -o <outputfile> "
                "-c <columnindex> -s <statname> "
            )
            sys.exit()
        elif opt in ("-i", "--inputfile"):
            inputfile = arg
        elif opt in ("-o", "--outputfile"):
            outputfile = arg
        elif opt in ("-c", "--columnindex"):
            column_index = int(arg)
        elif opt in ("-s", "--statname"):
            stat_name = arg

    convert_csv(inputfile, outputfile, column_index, stat_name)

    print("Done!")


if __name__ == "__main__":
    main(sys.argv[1:])
