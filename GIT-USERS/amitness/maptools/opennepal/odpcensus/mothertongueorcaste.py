import csv
import getopt
from itertools import groupby
from operator import itemgetter
from shared import geoidmappings
import sys


def rows_for_district(columnname):
    def vals_for_district(district_tuple):
        """
        :param district_tuple: a tuple of [0] district and [1] a dict of
        variable to total population for that variable in the district. Ex:
        ('Banke', {'Avadhi': 116477, 'Nepali': 194238, 'Magar': 4644})
        :return: a list of dicts that matches the format needed for NepalMap
        """
        return [
            {
                "geo_level": "district",
                "geo_code": geoidmappings.names_to_geo_ids[district_tuple[0]],
                columnname: key,
                "total": value,
            }
            for (key, value) in district_tuple[1]
        ]

    return vals_for_district


def national_totals(rows, headertext, columnname):
    """
    :param rows: data from CSV to be transformed into dicts for NepalMap
    :param headertext: the text of the header for the data to be extracted. Ex:
    "Caste" or "Caste/Ethnicity"
    :param columnname: the name of the column in the NepalMap database. Ex:
    "language" or "caste or ethnic group"
    :return: a list of dicts for each of the variables in Nepal
    """
    variable_getter = itemgetter(headertext)
    rows.sort(key=variable_getter)
    national_list = []
    for key, group in groupby(sorted(rows, key=variable_getter), variable_getter):
        national_list.append(
            {
                "geo_level": "country",
                "geo_code": "NP",
                columnname: key,
                "total": sum(
                    map(lambda item: int(item["Value"]) if item["Value"] else 0, group)
                ),
            }
        )
    return national_list


def add_missing_values_for_area(all_keys, tuples_for_area):
    variables_not_in_area = set(all_keys) - set(
        map(lambda tup: tup[0], tuples_for_area)
    )
    return [(variable, 0) for variable in variables_not_in_area]


def district_totals(rows, headertext, columnname):
    """
    :param rows: data from CSV to be transformed into dicts for NepalMap
    :param headertext: the text of the header for the data to be extracted. Ex:
    "Caste" or "Caste/Ethnicity"
    :param columnname: the name of the column in the NepalMap database. Ex:
    "language" or "caste or ethnic group"
    :return: for each district, a dict for each of the variables in
    Nepal. Any variable key not represented in the district is assigned a total
    of zero for the district.
    """
    all_keys = set(map(lambda row: row[headertext], rows))
    district_getter = itemgetter("District", headertext)
    districts_dict = {}
    for key, group in groupby(sorted(rows, key=district_getter), district_getter):
        district = key[0]
        variable = key[1]
        population_for_variable = sum(map(lambda i: int(i["Value"]), group))

        if district not in districts_dict:
            districts_dict[district] = {}
        districts_dict[district][variable] = population_for_variable

    district_data = []
    for district in districts_dict:
        totals_for_district = sorted(
            districts_dict[district].items(), key=itemgetter(1), reverse=True
        )
        not_in_district = add_missing_values_for_area(all_keys, totals_for_district)
        district_data.append((district, totals_for_district + not_in_district))

    return [
        item
        for sublist in list(map(rows_for_district(columnname), district_data))
        for item in sublist
    ]


def convert_csv(inputfile, outputfile, headertext, columnname):
    print("Input file: {}\nOutput file: {}".format(inputfile, outputfile))
    desired_keys = ["District", headertext, "Indicator", "Value"]
    with open(inputfile, "r") as data:
        reader = csv.DictReader(data)

        rows = [
            {desired_key: row[desired_key] for desired_key in desired_keys}
            for row in reader
        ]

        national_data = national_totals(rows, headertext, columnname)
        district_data = district_totals(rows, headertext, columnname)

        all_data = sorted(
            national_data + district_data,
            key=lambda r: "{}{}{}".format(r["geo_level"], r["geo_code"], r["total"]),
        )

    with open(outputfile, "w") as csv_out:
        csv_keys = all_data[0].keys()
        writer = csv.DictWriter(csv_out, fieldnames=csv_keys)
        writer.writeheader()
        for row in all_data:
            writer.writerow(row)


def main(args):
    inputfile = ""
    outputfile = ""
    headertext = ""
    columnname = ""
    try:
        opts, args = getopt.getopt(
            args,
            "hi:o:t:c:",
            ["inputfile=", "outputfile=", "headertext=", "columnname="],
        )
    except getopt.GetoptError:
        print(
            "python povertyrates.py -i <inputfile> -o <outputfile> "
            "-t <headertext> -c <columnname>"
        )
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print(
                "python povertyrates.py -i <inputfile> -o <outputfile>"
                "-t <headertext> -c <columnname>"
            )
            sys.exit()
        elif opt in ("-i", "--inputfile"):
            inputfile = arg
        elif opt in ("-o", "--outputfile"):
            outputfile = arg
        elif opt in ("-t", "--headertext"):
            headertext = arg
        elif opt in ("-c", "--columnname"):
            columnname = arg

    convert_csv(inputfile, outputfile, headertext, columnname)

    print("Done!")


if __name__ == "__main__":
    main(sys.argv[1:])
