import json
from abc import ABCMeta, abstractmethod
import csv
import getopt
from itertools import groupby
from operator import itemgetter
from shared import geoidmappings
import os
import sys


class RowMaker:
    __metaclass__ = ABCMeta

    @abstractmethod
    def make_row(self, geo_level, geo_code, value_name, total):
        pass

    @abstractmethod
    def national_totals(self, district_rows):
        pass


class SingleFieldRowMaker(RowMaker):
    def __init__(self, field_name):
        self.field_name = field_name

    def make_row(self, geo_level, geo_code, value_name, total):
        return {
            "geo_level": geo_level,
            "geo_code": geo_code,
            self.field_name: value_name,
            "total": total,
        }

    def national_totals(self, district_rows):
        getter = itemgetter(self.field_name)
        return [
            self.make_row("country", "NP", key, sum(map(lambda i: i["total"], group)))
            for key, group in groupby(sorted(district_rows, key=getter), getter)
        ]


class BySexRowMaker(RowMaker):
    def __init__(self, field_name):
        self.field_name = field_name

    @staticmethod
    def __extract_sex_from_value_name(value_name):
        if value_name.endswith("_MALE"):
            sex = "male"
        elif value_name.endswith("_FEMALE"):
            sex = "female"
        elif value_name.endswith("_BOTH_SEX"):
            sex = "both"
        else:
            sex = None
        name = (
            value_name.replace("_BOTH_SEX", "")
            .replace("_FEMALE", "")
            .replace("_MALE", "")
        )
        return name, sex

    def make_row(self, geo_level, geo_code, value_name, total):
        row = None
        value, sex = self.__extract_sex_from_value_name(value_name)
        if sex in ["male", "female"]:
            row = {
                "geo_level": geo_level,
                "geo_code": geo_code,
                self.field_name: value,
                "sex": sex,
                "total": total,
            }
        return row

    def national_totals(self, district_rows):
        totals = []
        getter = itemgetter(self.field_name, "sex")
        for key, group in groupby(sorted(district_rows, key=getter), getter):
            totals.append(
                {
                    "geo_level": "country",
                    "geo_code": "NP",
                    self.field_name: key[0],
                    "sex": key[1],
                    "total": sum(map(lambda i: i["total"], group)),
                }
            )

        return totals


class CsvConverter:
    def __init__(
        self,
        row_maker,
        excluded_columns=None,
        total_column_names=None,
        total_column_key=None,
        vdc_names_to_geo_ids=None,
    ):
        self.row_maker = row_maker
        self.excluded_columns = excluded_columns if excluded_columns else []
        self.total_columns = total_column_names if total_column_names else []
        self.total_column_key = total_column_key
        self.vdc_names_to_geo_ids = vdc_names_to_geo_ids

    def __get_vdc_geo_code(self, district, vdc_name):
        vdcs_for_district = self.vdc_names_to_geo_ids[district]
        if vdc_name in vdcs_for_district:
            return vdcs_for_district[vdc_name]
        else:
            return None

    def convert_csv(self, districts_dir, output_file, field_names, csv_name):
        def get_immediate_subdirectories(a_dir):
            return [
                name
                for name in os.listdir(a_dir)
                if os.path.isdir(os.path.join(a_dir, name))
            ]

        def build_csv_location(district_name):
            return "{}/{}/{}".format(districts_dir, district_name, csv_name)

        csv_file_names = list(
            map(build_csv_location, get_immediate_subdirectories(districts_dir))
        )
        district_rows = []
        vdc_rows = []

        for csv_file in csv_file_names:
            district = csv_file.split("/")[-2]
            district_geo_code = geoidmappings.names_to_geo_ids[district]
            unmapped_vdcs = set()
            with open(csv_file, "r") as data:
                total_dict = {}
                reader = csv.DictReader(data)
                for row in (
                    row for row in reader if row["VDC/MUNICIPALITY"] != "TOTAL"
                ):
                    vdc = row["VDC/MUNICIPALITY"]
                    vdc_geo_code = self.__get_vdc_geo_code(district, vdc)
                    row.pop("VDC/MUNICIPALITY")
                    for column in self.excluded_columns:
                        row.pop(column)
                    if self.total_columns and self.total_column_key:
                        row[self.total_column_key] = 0
                        for column in self.total_columns:
                            row[self.total_column_key] += int(row[column])
                            row.pop(column)
                    for key, value in row.items():
                        if vdc_geo_code:
                            vdc_row = self.row_maker.make_row(
                                "vdc", vdc_geo_code, key, int(value)
                            )
                        else:
                            vdc_row = None
                            unmapped_vdcs.add(vdc)
                        if vdc_row:
                            vdc_rows.append(vdc_row)
                        if key in total_dict:
                            total_dict[key] += int(value)
                        else:
                            total_dict[key] = int(value)
                for key, value in total_dict.items():
                    row = self.row_maker.make_row(
                        "district", district_geo_code, key, value
                    )
                    if row:
                        district_rows.append(row)
            if unmapped_vdcs:
                print(
                    "No data found for {} in "
                    "district {}".format(", ".join(unmapped_vdcs), district)
                )

        all_rows = (
            vdc_rows + district_rows + self.row_maker.national_totals(district_rows)
        )

        sorted_rows = sorted(
            all_rows, key=lambda r: "{}{}".format(r["geo_level"], r["geo_code"])
        )
        with open(output_file, "w") as csv_out:
            csv_keys = field_names
            writer = csv.DictWriter(csv_out, fieldnames=csv_keys)
            writer.writeheader()
            for row in sorted_rows:
                writer.writerow(row)

        print("Done!")


def main(args):
    indir = ""
    outputcsv = ""
    vdcjson = ""
    fieldname = ""
    csvname = ""
    by_sex = False
    excluded_columns = []
    total_columns = []
    total_column_key = None
    vdc_names_to_geo_ids = None
    try:
        opts, args = getopt.getopt(
            args,
            "hi:o:v:f:c:se:n:k:",
            [
                "indir=",
                "outputcsv=",
                "vdcjson=" "fieldname=",
                "csvname=",
                "bysex",
                "excludedcolumns=",
                "totalcolumns=",
                "totalcolumnkey=",
            ],
        )
    except getopt.GetoptError:
        print(
            "python csvconverter.py -i <indir> -o <outputcsv> -v <vdcjson>"
            "-f <fieldname> -c <csvname> -s -e <excludedcolumns> "
            "-n <totalcolumns> -k <totalcolumnkey>"
        )
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print(
                "python csvconverter.py -i <indir> -o <outputcsv> "
                "-v <vdcjson> -f <fieldname> -c <csvname> -s "
                "-e <excludedcolumns> -n <totalcolumns> -k <totalcolumnkey>"
            )
            sys.exit()
        elif opt in ("-i", "--indir"):
            indir = arg
        elif opt in ("-o", "--outputcsv"):
            outputcsv = arg
        elif opt in ("-v", "--vdcjson"):
            vdcjson = arg
        elif opt in ("-f", "--fieldname"):
            fieldname = arg
        elif opt in ("-c", "--csvname"):
            csvname = arg
        elif opt in ("-s", "--csvname"):
            by_sex = True
        elif opt in ("-e", "--excludedcolumns"):
            excluded_columns = arg.split(",")
        elif opt in ("-n", "--totalcolumns"):
            total_columns = arg.split(",")
        elif opt in ("-k", "--totalcolumnkey"):
            if total_columns:
                total_column_key = arg

    with open(vdcjson, "r") as vdc_json_file:
        vdc_names_to_geo_ids = json.load(vdc_json_file)

    if not vdc_names_to_geo_ids:
        raise ValueError("No VDC Geo ID mappings. " "Cannot process data without them")

    if by_sex:
        row_maker = BySexRowMaker(fieldname)
        rows = ["geo_code", "geo_level", fieldname, "sex", "total"]
    else:
        row_maker = SingleFieldRowMaker(fieldname)
        rows = ["geo_code", "geo_level", fieldname, "total"]
    converter = CsvConverter(
        row_maker,
        excluded_columns=excluded_columns,
        total_column_names=total_columns,
        total_column_key=total_column_key,
        vdc_names_to_geo_ids=vdc_names_to_geo_ids,
    )
    converter.convert_csv(indir, outputcsv, rows, csvname)


if __name__ == "__main__":
    main(sys.argv[1:])
