import csv
import os
import json

# open files, initialize readers for CSV files
with open(os.path.relpath("../doc/dataset.csv")) as dataset,\
    open(os.path.relpath("../doc/total_production.csv")) as productionCsv,\
    open(os.path.relpath("../doc/dataset.json"), "w") as outfile:
    datasetReader = csv.reader(dataset)
    productionReader = csv.reader(productionCsv)

    # skip first rows of input CSV's
    next(productionReader)
    next(datasetReader)

    # extract list with all country codes from total production CSV file
    countriesList = []
    for row in productionReader:
        countriesList.append(row[0])
    countriesList = sorted(countriesList)

    # dict with all JSON information
    jsonDict = {}

    # fill root of dict with country codes, who's value is a dict with food items and production values
    for country in countriesList:
        jsonDict[country] = {"items": {}}

    # fill dict with relevant information from CSV
    for row in datasetReader:
        try:
            jsonDict[row[0]]["items"][row[3]]
        except KeyError:
            jsonDict[row[0]]["items"][row[3]] = {}
        jsonDict[row[0]]["items"][row[3]][row[6]] = {}
        jsonDict[row[0]]["items"][row[3]]["name"] = row[4]
        # jsonDict[row[0]]["items"][row[3]][row[6]]["production"] = {}

        # add yearly production value information
        for value in row:
            for i in range(10, 63):
                jsonDict[row[0]]["items"][row[3]][row[6]][str(i + 1951)] = row[i]

    # dump dict as JSON file
    json.dump(jsonDict, outfile)
