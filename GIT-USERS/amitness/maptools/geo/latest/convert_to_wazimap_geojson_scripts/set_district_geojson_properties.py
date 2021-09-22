import getopt
import json
import re
import sys

"""
Script to manipulate the properties of each District in the district_fix.geojson file
in the geo repository and convert each to the format needed for NepalMap output as district.geojson
"""

district_province_rel = [
    {"Jhapa": "pro-1"},
    {"Ilam": "pro-1"},
    {"Panchthar": "pro-1"},
    {"Taplejung": "pro-1"},
    {"Morang": "pro-1"},
    {"Sunsari": "pro-1"},
    {"Bhojpur": "pro-1"},
    {"Dhankuta": "pro-1"},
    {"Tehrathum": "pro-1"},
    {"Sankhuwasabha": "pro-1"},
    {"Saptari": "pro-2"},
    {"Siraha": "pro-2"},
    {"Udayapur": "pro-1"},
    {"Khotang": "pro-1"},
    {"Okhaldhunga": "pro-1"},
    {"Solukhumbu": "pro-1"},
    {"Dhanusa": "pro-2"},
    {"Mahottari": "pro-2"},
    {"Sarlahi": "pro-2"},
    {"Sindhuli": "pro-3"},
    {"Ramechhap": "pro-3"},
    {"Dolakha": "pro-3"},
    {"Bhaktapur": "pro-3"},
    {"Dhading": "pro-3"},
    {"Kathmandu": "pro-3"},
    {"Kavrepalanchowk": "pro-3"},
    {"Lalitpur": "pro-3"},
    {"Nuwakot": "pro-3"},
    {"Rasuwa": "pro-3"},
    {"Sindhupalchowk": "pro-3"},
    {"Bara": "pro-2"},
    {"Parsa": "pro-2"},
    {"Rautahat": "pro-2"},
    {"Chitwan": "pro-3"},
    {"Makwanpur": "pro-3"},
    {"Gorkha": "pro-4"},
    {"Kaski": "pro-4"},
    {"Lamjung": "pro-4"},
    {"Syangja": "pro-4"},
    {"Tanahu": "pro-4"},
    {"Manang": "pro-4"},
    {"Kapilvastu": "pro-5"},
    {"Nawalpur": "pro-4"},
    {"Parasi": "pro-5"},
    {"Rupandehi": "pro-5"},
    {"Arghakhanchi": "pro-5"},
    {"Gulmi": "pro-5"},
    {"Palpa": "pro-5"},
    {"Baglung": "pro-4"},
    {"Myagdi": "pro-4"},
    {"Parbat": "pro-4"},
    {"Mustang": "pro-4"},
    {"Dang": "pro-5"},
    {"Pyuthan": "pro-5"},
    {"Rolpa": "pro-5"},
    {"Eastern Rukum": "pro-5"},
    {"Nawalparasi": "pro-5"},
    {"Salyan": "pro-6"},
    {"Dolpa": "pro-6"},
    {"Humla": "pro-6"},
    {"Jumla": "pro-6"},
    {"Kalikot": "pro-6"},
    {"Mugu": "pro-6"},
    {"Banke": "pro-5"},
    {"Bardiya": "pro-5"},
    {"Surkhet": "pro-6"},
    {"Dailekh": "pro-6"},
    {"Jajarkot": "pro-6"},
    {"Kailali": "pro-7"},
    {"Achham": "pro-7"},
    {"Doti": "pro-7"},
    {"Bajhang": "pro-7"},
    {"Bajura": "pro-7"},
    {"Kanchanpur": "pro-7"},
    {"Dadeldhura": "pro-7"},
    {"Baitadi": "pro-7"},
    {"Darchula": "pro-7"},
]


def convert_json(input_file, output_file):
    with open(input_file, "r") as data_file:
        data = json.load(data_file)

        def build_wazimap_feature(feature):
            old_type = feature["type"]
            old_geometry = feature["geometry"]
            old_properties = feature["properties"]

            code = str(int(old_properties["COUNT"]))
            name = str(old_properties["DISTRICT"]).strip().title()

            def get_parent_geoid(name):
                for item in district_province_rel:
                    if name in item.keys():
                        return str(item[name])

            parent = get_parent_geoid(name)[-1] if get_parent_geoid(name) else "xxx"

            new_properties = {
                "code": "{}-{}".format("dis", code),
                "name": name,
                "geoid": "{}-{}".format("dis", code),
                "level": "district",
                "parent_code": get_parent_geoid(name),
                "parent_name": "{} {}".format("Province No.", parent),
            }
            return {
                "type": old_type,
                "geometry": old_geometry,
                "properties": new_properties,
            }

        features = list(map(lambda f: build_wazimap_feature(f), data["features"]))

        len(features)
        new_collection = dict(type=data["type"], features=features)

        with open(output_file, "w") as json_out:
            json.dump(new_collection, json_out, ensure_ascii=False)

    print("Done!")


def main(args):
    inputjson = ""
    outputjson = ""
    try:
        opts, args = getopt.getopt(args, "hi:o:", ["inputjson=", "outputjson="])
    except getopt.GetoptError:
        print(
            "python set_district_geojson_properties.py -i <inputjson> -o <outputjson>"
        )
        sys.exit(2)
    for opt, arg in opts:
        if opt == "-h":
            print(
                "python set_district_geojson_properties.py "
                "-i <inputjson> "
                "-o <outputjson>"
            )
            sys.exit()
        elif opt in ("-i", "--inputjson"):
            inputjson = arg
        elif opt in ("-o", "--outputjson"):
            outputjson = arg

    convert_json(inputjson, outputjson)


if __name__ == "__main__":
    main(sys.argv[1:])
