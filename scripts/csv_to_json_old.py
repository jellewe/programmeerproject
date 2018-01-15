import csv
import os
import json

with open(os.path.relpath("../doc/dataset.csv")) as infile, open(os.path.relpath("../doc/dataset.json"), "w") as outfile:
    reader = csv.reader(infile)

    row0 = next(reader)

    for row in reader:
        # add country code to json
        jsonString = "[{\"country_code\": " + row[0] + ", "
        jsonString += "item_code: " + row[3] + ", "
        jsonString += "item: " + row[4] + ", "
        jsonString += "production_per_year: ["
        for i in range(10, 63):
            jsonString += str(1951 + i) + ": " + row[i] + ", "
        jsonString += "}]"
    json.dump(jsonString, outfile)
