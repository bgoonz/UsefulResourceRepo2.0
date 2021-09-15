import getopt
import csv
import json
import re
import sys


"""
Script to grab basic details about each VDC from the vdc.geojson file
and build a CSV for analysis of names and districts to which each VDC is
assigned
"""

names_to_geo_ids = {
    "Achham": "68",
    "Arghakhanchi": "46",
    "Baglung": "51",
    "Baitadi": "73",
    "Bajhang": "69",
    "Bajura": "67",
    "Banke": "65",
    "Bara": "32",
    "Bardiya": "66",
    "Bhaktapur": "25",
    "Bhojpur": "06",
    "Chitawan": "35",
    "Chitwan": "35",
    "Dadeldhura": "74",
    "Dailekh": "63",
    "Dang": "60",
    "Darchula": "72",
    "Dhading": "30",
    "Dhankuta": "07",
    "Dhanusa": "20",
    "Dhanusha": "20",
    "Dolakha": "17",
    "Dolpa": "52",
    "Doti": "70",
    "Gorkha": "36",
    "Gulmi": "45",
    "Humla": "56",
    "Ilam": "03",
    "Illam": "03",
    "Jajarkot": "62",
    "Jhapa": "04",
    "Jumla": "54",
    "Kailali": "71",
    "Kalikot": "55",
    "Kanchanpur": "75",
    "Kapilbastu": "47",
    "Kaski": "40",
    "Kathmandu": "27",
    "Kavre": "24",
    "Kavrepalanchok": "24",
    "Khotang": "13",
    "Lalitpur": "26",
    "Lamjung": "37",
    "Mahottari": "21",
    "Makawanpur": "34",
    "Makwanpur": "34",
    "Manang": "39",
    "Morang": "09",
    "Mugu": "53",
    "Mustang": "48",
    "Myagdi": "49",
    "Nawalparasi": "42",
    "Nuwakot": "29",
    "Okhaldhunga": "12",
    "Palpa": "43",
    "Panchthar": "02",
    "Parbat": "50",
    "Parsa": "33",
    "Pyuthan": "59",
    "Ramechhap": "18",
    "Rasuwa": "28",
    "Rautahat": "31",
    "Rolpa": "58",
    "Rukum": "57",
    "Rupandehi": "44",
    "Salyan": "61",
    "Sankhuwasabha": "05",
    "Saptari": "15",
    "Sarlahi": "22",
    "Sindhuli": "19",
    "Sindhupalchok": "23",
    "Sindhupalchowk": "23",
    "Siraha": "16",
    "Solukhumbu": "11",
    "Sunsari": "10",
    "Surkhet": "64",
    "Syangja": "41",
    "Tahanun": "38",
    "Tanahu": "38",
    "Taplejung": "01",
    "Tehrathum": "08",
    "Terhathum": "08",
    "Udayapur": "14",
}


def convert_csv(input_file, output_file):
    with open(input_file, "r") as data_file:
        data = json.load(data_file)

        def select_keys_from_vdc_properties(vdc):
            district_name = vdc["NAME_3"]
            vdc_name = re.sub(
                "(?<!^)(?=[A-Z])",
                " ",
                re.sub(
                    "[^a-zA-Z]+",
                    "",
                    vdc["NAME_4"]
                    .replace("N.P", "Municipality")
                    .replace("National Par", "National Park"),
                ),
            )
            district_id = names_to_geo_ids[district_name]
            return {
                "country": vdc["NAME_0"],
                "region": vdc["NAME_1"],
                "zone": vdc["NAME_2"],
                "district_id": district_id,
                "district": district_name,
                "vdc_geo_code": vdc["ID_4"],
                "vdc": vdc_name,
            }

        properties = list(
            map(
                lambda f: select_keys_from_vdc_properties(f["properties"]),
                data["features"],
            )
        )
        len(properties)

        fieldnames = [
            "country",
            "region",
            "zone",
            "district_id",
            "district",
            "vdc_geo_code",
            "vdc",
        ]

        sorted_properties = sorted(
            properties,
            key=lambda elem: "%s %s %s %s"
            % (elem["region"], elem["zone"], elem["district_id"], elem["vdc"]),
        )

        with open(output_file, "w") as csv_out:
            writer = csv.DictWriter(csv_out, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(sorted_properties)

    print("Done!")


def main(args):
    indir = ""
    outputcsv = ""
    try:
        opts, args = getopt.getopt(args, "hi:o:", ["indir=", "outputcsv="])
    except getopt.GetoptError:
        print("python vdc_to_csv.py -i <indir> -o <outputcsv>")
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print("python vdc_to_csv.py -i <indir> -o <outputcsv>")
            sys.exit()
        elif opt in ("-i", "--indir"):
            indir = arg
        elif opt in ("-o", "--outputcsv"):
            outputcsv = arg

    convert_csv(indir, outputcsv)


if __name__ == "__main__":
    main(sys.argv[1:])
