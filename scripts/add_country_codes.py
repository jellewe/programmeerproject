# Jelle Witsen Elias, University of Amsterdam 10753532, 01-02-2018
# Adds country codes to json file to use in project

import csv
import os
import json

# open files, initialize readers for CSV files
with open(os.path.relpath("../doc/WITS-Partner.csv"), encoding='latin-1') as dataset,\
    open(os.path.relpath("../doc/WITS_country_codes.csv"), encoding='latin-1') as codesCsv,\
    open(os.path.relpath("../doc/export_data.json"), "w") as outfile:
    datasetReader = csv.reader(dataset)
    countryCodesReader = csv.reader(codesCsv)

    # skip first rows, store info of first row of dataset csv
    columnDescriptions = next(datasetReader)
    next(countryCodesReader)

    # add country codes to dict
    countryCodesDict = {}
    for row in countryCodesReader:
        countryCodesDict[row[0]] = row[1]

    # add country codes to json dict
    jsonDict = {}
    for row in datasetReader:
        try:
            countryCode = countryCodesDict[row[1]]
        except KeyError:
            pass
        jsonDict[countryCode] = {}
        for i in range(5, 27):
            jsonDict[countryCode][columnDescriptions[i]] = row[i]

    # dump json
    json.dump(jsonDict, outfile)
