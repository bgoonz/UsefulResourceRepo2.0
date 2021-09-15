import csv
import getopt
import shapefile

import sys
from collections import namedtuple
from shared import geoidmappings

verbose = False

facility_type_map = {
    "Hospital": "HOSPITAL",
    "Private Hospital": "PRIVATE_HOSPITAL",
    "Zonal Hospital": "ZONAL_HOSPITAL",
    "Central Hospital": "CENTRAL_HOSPITAL",
    "Health Center": "HEALTH_CENTER",
    "Primary Health Center": "PRIMARY_HEALTH_CENTER",
    "Supply Center": "SUPPLY_CENTER",
    "District Center": "DISTRICT_CENTER",
    "Sub Center": "SUB_CENTER",
    "Laxmipur": "LAXMIPUR",
    "Refugee Camp": "REFUGEE_CAMP",
    "DIstrict Cold Room": "DISTRICT_COLD_ROOM",
    "Distict Cold Room": "DISTRICT_COLD_ROOM",
    "District Cold Room": "DISTRICT_COLD_ROOM",
    "DAHC": "DAHC",
    "RMS": "RMS",
    "DPHO": "DPHO",
    "D(P)HO": "DPHO",
    "Health Post": "HEALTH_POST",
    "Primary Health Post": "PRIMARY_HEALTH_POST",
    "Sub Health Post": "SUB_HEALTH_POST",
    "Health Care Center": "HEALTH_CARE_CENTER",
    "Ayurvedic Aushadhalaya": "AYURVEDIC_AUSHADHALAYA",
    "District Ayurvedic HC": "DISTRICT_AYURVEDIC_HC",
}

all_facilities = set([val for _, val in facility_type_map.iteritems()])

all_districts = set([val for _, val in geoidmappings.names_to_geo_ids.iteritems()])

geo_level_key = "geo_level"
geo_code_key = "geo_code"
facility_type_key = "facility_type"
total_key = "total"


def national_totals(district_rows):

    return [
        {
            geo_level_key: "country",
            geo_code_key: "NP",
            facility_type_key: facility,
            total_key: sum(
                [
                    district["total"]
                    for district in district_rows
                    if district["facility_type"] == facility
                ]
            ),
        }
        for facility in all_facilities
    ]


HealthFacility = namedtuple(
    "HealthFacility", ["facility_type", "district_id", "vdc_name", "vdc_code"]
)


def get_data_from_shapefile(filename):
    sf = shapefile.Reader(filename)

    data = {}
    facilities = set()
    for rec in sf.records():
        district = rec[2]
        if district in geoidmappings.names_to_geo_ids:
            district_id = geoidmappings.names_to_geo_ids[district]
            if district_id not in data:
                data[district_id] = {}

            this_facility = HealthFacility(rec[1], district_id, rec[3], rec[4])

            if verbose and this_facility in facilities:
                print("{0} not unique".format(this_facility))

            facilities.add(HealthFacility(rec[1], district_id, rec[3], rec[4]))

        elif verbose:
            print("Unknown district: {0}".format(rec))

    for f in facilities:
        if len(f.facility_type) and f.facility_type in facility_type_map:

            facility_type = facility_type_map[f.facility_type]

            if facility_type in data[f.district_id]:
                new_count = data[f.district_id][facility_type] + 1
            else:
                new_count = 1

            data[f.district_id][facility_type] = new_count

        elif verbose:
            print("{0} not in facility_type_map".format(rec))

    return data


def extract_each_district(district_data):
    district_rows = []

    for district in all_districts:
        if district in district_data:
            this_district = district_data[district]
            for facility in all_facilities:
                if facility in this_district:
                    count = this_district[facility]
                else:
                    count = 0

                district_rows.append(
                    {
                        geo_level_key: "district",
                        geo_code_key: district,
                        facility_type_key: facility,
                        total_key: count,
                    }
                )

    return district_rows


def convert_to_csv(inputfile, outputfile):
    print("Input file: {}\nOutput file: {}".format(inputfile, outputfile))

    district_data = get_data_from_shapefile(inputfile)

    # find any missing districts
    districts_with_data = set([key for key, _ in district_data.iteritems()])

    districts_missing_data = list(all_districts - districts_with_data)
    if len(districts_missing_data):
        print("Districts without data: {0}".format(districts_missing_data))

    district_csv_data = extract_each_district(district_data)

    with open(outputfile, "w") as csv_out:
        csv_keys = [geo_code_key, geo_level_key, facility_type_key, total_key]
        writer = csv.writer(csv_out)
        writer.writerow(csv_keys)
        for row in national_totals(district_csv_data) + district_csv_data:
            writer.writerow([row[key] for key in csv_keys])


def main(args):
    inputfile = ""
    outputfile = ""
    try:
        opts, args = getopt.getopt(args, "hvi:o:", ["inputfile=", "outputfile="])
    except getopt.GetoptError:
        print("python deliveries.py " "-i <inputfile> " "-o <outputfile> ")
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print("python health.py " "-i <inputfile> " "-o <outputfile> ")
            sys.exit()
        elif opt in ("-i", "--inputfile"):
            inputfile = arg
        elif opt in ("-o", "--outputfile"):
            outputfile = arg
        elif opt == "-v":
            global verbose
            verbose = True

    convert_to_csv(inputfile, outputfile)
    print("Done!")


if __name__ == "__main__":
    main(sys.argv[1:])
