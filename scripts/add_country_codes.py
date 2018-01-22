import csv
import os
import json

# open files, initialize readers for CSV files
with open(os.path.relpath("../doc/WITS-Partner.csv"), encoding='latin-1') as dataset,\
    open(os.path.relpath("../doc/WITS_country_codes.csv"), encoding='latin-1') as codesCsv,\
    open(os.path.relpath("../doc/export_data.json"), "w") as outfile:
    datasetReader = csv.reader(dataset)
    countryCodesReader = csv.reader(codesCsv)

    columnDescriptions = next(datasetReader)
    next(countryCodesReader)

    countryCodesDict = {}
    for row in countryCodesReader:
        countryCodesDict[row[0]] = row[1]

    print(countryCodesDict)
    jsonDict = {}

    for row in datasetReader:
        try:
            countryCode = countryCodesDict[row[1]]
        except KeyError:
            pass
        jsonDict[countryCode] = {}
        for i in range(5, 27):
            jsonDict[countryCode][columnDescriptions[i]] = row[i]

    json.dump(jsonDict, outfile)
