import csv
import getopt
import sys
from itertools import groupby
from operator import itemgetter
from shared import geoidmappings

all_years = [str(year) for year in range(2003, 2073)]


def national_totals(district_rows):
    totals = []
    getter = itemgetter("registered company type", "year")
    for key, group in groupby(sorted(district_rows, key=getter), getter):
        totals.append(
            {
                "geo_level": "country",
                "geo_code": "NP",
                "registered company type": key[0],
                "year": key[1],
                "total": sum(map(lambda i: i["total"], group)),
            }
        )

    return totals


def all_years_including_zeros(location_years_with_data, company_types):
    years_with_no_registrations = []
    geo_level = location_years_with_data[0]["geo_level"]
    geo_code = location_years_with_data[0]["geo_code"]
    for company_type in company_types:
        years_for_type = [
            row["year"]
            for row in location_years_with_data
            if row["registered company type"] == company_type
        ]
        for year in [year for year in all_years if year not in years_for_type]:
            years_with_no_registrations.append(
                {
                    "geo_level": geo_level,
                    "geo_code": geo_code,
                    "registered company type": company_type,
                    "year": year,
                    "total": 0,
                }
            )
    result = location_years_with_data + years_with_no_registrations
    return result


def convert_csv(input_file, output_file):
    all_districts_businesses = []
    district_getter = itemgetter("DISTRICT")
    company_type_getter = itemgetter("COMPANY_TYPE")
    year_getter = itemgetter("REGISTRATION_DATE")
    with open(input_file, "r") as data:
        reader = csv.DictReader(data)
        all_data = [row for row in reader if row["DISTRICT"] != "District not known"]
        business_types = set([row["COMPANY_TYPE"] for row in all_data])
        for district, district_group in groupby(
            sorted(all_data, key=district_getter), district_getter
        ):
            geo_code = geoidmappings.names_to_geo_ids[district]
            this_districts_businesses = []
            for company_type, company_group in groupby(
                sorted(list(district_group), key=company_type_getter),
                company_type_getter,
            ):
                year_rows_for_type = []
                for year, year_group in groupby(
                    sorted(list(company_group), key=year_getter), year_getter
                ):
                    total_for_year = len(list(year_group))
                    data_row = {
                        "geo_level": "district",
                        "geo_code": geo_code,
                        "registered company type": company_type,
                        "year": year,
                        "total": total_for_year,
                    }
                    year_rows_for_type.append(data_row)
                this_districts_businesses += year_rows_for_type
            this_districts_with_zeros = all_years_including_zeros(
                this_districts_businesses, business_types
            )
            all_districts_businesses += this_districts_with_zeros
    national_registrations = national_totals(all_districts_businesses)
    all_rows = all_districts_businesses + all_years_including_zeros(
        national_registrations, business_types
    )
    sorted_rows = sorted(
        all_rows,
        key=lambda x: (
            x.get("geo_code"),
            x.get("registered company type"),
            x.get("year"),
        ),
    )
    with open(output_file, "w") as csv_out:
        csv_keys = sorted_rows[0].keys()
        writer = csv.DictWriter(csv_out, fieldnames=csv_keys)
        writer.writeheader()
        for row in sorted_rows:
            writer.writerow(row)


def main(args):
    inputcsv = ""
    finalcsv = ""
    try:
        opts, args = getopt.getopt(args, "hi:o:", ["inputcsv=", "finalcsv="])
    except getopt.GetoptError:
        print("python registeredcompanies.py -i <inputcsv> -o <outputcsv> ")
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print("python registeredcompanies.py -i <inputcsv> " "-o <outputcsv>")
            sys.exit()
        elif opt in ("-i", "--inputcsv"):
            inputcsv = arg
        elif opt in ("-o", "--finalcsv"):
            finalcsv = arg

    convert_csv(inputcsv, finalcsv)

    print("Done!")


if __name__ == "__main__":
    main(sys.argv[1:])
