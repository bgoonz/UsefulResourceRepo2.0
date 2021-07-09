with open("model_dictionary.json",'w') as f:
    json.dump(model_dict,f)
f.close()
with open("company_dictionary.json",'w')as f:
    json.dump(company_dict,f)
f.close()
with open("fuelType_dictionary.json",'w') as f:
    json.dump(fueltype_dict,f)
f.close()
with open("transmission_dictionary.json",'w')as f:
    json.dump(transmission_dict,f)
f.close()
with open("vitals_dictionary.json",'w')as f:
    json.dump(vals,f)
f.close()