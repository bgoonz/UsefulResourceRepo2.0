import csv
import getopt
import sys
from itertools import groupby
from operator import itemgetter
from shared import geoidmappings


def normalize(input_file, output_file):
    with open(input_file, "r") as data_in, open(output_file, "w") as data_out:
        reader = csv.reader(data_in)
        writer = csv.writer(data_out)
        first = next(reader)
        fields = list((filter(lambda f: len(f) > 0, first)))
        column_headers = list(
            map(lambda c: c.upper().replace(" ", "_").replace(",", ""), fields)
        ) + ["NOT_STATED"]
        male_headers = list(map(lambda h: h + "_MALE", column_headers))
        female_headers = list(map(lambda h: h + "_FEMALE", column_headers))
        joined_headers = [
            val for pair in zip(male_headers, female_headers) for val in pair
        ]
        writer.writerow(["DISTRICT"] + joined_headers)
        more = True
        district_rows = []
        while more:
            try:
                district_name_row = next(reader)
                if (
                    district_name_row
                    and district_name_row[0]
                    and len(district_name_row[0]) > 0
                ):
                    more = True
                    district_name = district_name_row[0]
                    next(reader)  # consumed but not used
                    male_row = next(reader)
                    female_row = next(reader)
                    counts = [
                        val
                        for pair in zip(male_row[1:], female_row[1:])
                        for val in pair
                    ]
                    district_rows.append([district_name] + counts)
                else:
                    more = False
            except StopIteration:
                more = False
        for row in sorted(district_rows, key=lambda r: r[0]):
            writer.writerow(row)

    return output_file


def national_totals(district_rows):
    totals = []
    getter = itemgetter("field of study", "sex")
    for key, group in groupby(sorted(district_rows, key=getter), getter):
        totals.append(
            {
                "geo_level": "country",
                "geo_code": "NP",
                "field of study": key[0],
                "sex": key[1],
                "total": sum(map(lambda i: i["total"], group)),
            }
        )

    return totals


def extract_sex_from_value_name(value_name):
    if value_name.endswith("_MALE"):
        sex = "male"
    elif value_name.endswith("_FEMALE"):
        sex = "female"
    else:
        sex = None
    name = value_name.replace("_FEMALE", "").replace("_MALE", "")
    return name, sex


def convert_csv(input_file, output_file):
    district_rows = []
    with open(input_file, "r") as data:
        reader = csv.DictReader(data)
        for row in reader:
            geo_code = geoidmappings.names_to_geo_ids[row["DISTRICT"]]
            row.pop("DISTRICT", None)
            for key, total in row.items():
                field_of_study, sex = extract_sex_from_value_name(key)
                if sex in ["male", "female"]:
                    data_row = {
                        "geo_level": "district",
                        "geo_code": geo_code,
                        "field of study": field_of_study,
                        "sex": sex,
                        "total": int(total),
                    }
                    district_rows.append(data_row)

    all_rows = district_rows + national_totals(district_rows)
    sorted_rows = sorted(
        all_rows,
        key=lambda x: (x.get("geo_code"), x.get("field of study"), x.get("sex")),
    )
    with open(output_file, "w") as csv_out:
        csv_keys = sorted_rows[0].keys()
        writer = csv.DictWriter(csv_out, fieldnames=csv_keys)
        writer.writeheader()
        for row in sorted_rows:
            writer.writerow(row)


def main(args):
    inputcsv = ""
    intermediatecsv = ""
    finalcsv = ""
    try:
        opts, args = getopt.getopt(
            args, "hi:o:f:", ["inputcsv=", "intermediatecsv=", "finalcsv="]
        )
    except getopt.GetoptError:
        print(
            "python field_of_study.py -i <inputcsv> -o <intermediatecsv> "
            "-f ,<finalcsv>"
        )
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print(
                "python field_of_study.py -i <inputcsv> "
                "-o <intermediatecsv> -f ,<finalcsv>"
            )
            sys.exit()
        elif opt in ("-i", "--inputcsv"):
            inputcsv = arg
        elif opt in ("-o", "--intermediatecsv"):
            intermediatecsv = arg
        elif opt in ("-f", "--finalcsv"):
            finalcsv = arg
    file_to_convert = normalize(inputcsv, intermediatecsv)

    convert_csv(file_to_convert, finalcsv)

    print("Done!")


if __name__ == "__main__":
    main(sys.argv[1:])
