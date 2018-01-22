import csv
import os
import json

# open files, initialize readers for CSV files
with open(os.path.relpath("../doc/dataset.csv"), encoding='latin-1') as dataset,\
    open(os.path.relpath("../doc/total_production.csv"), encoding='latin-1') as productionCsv,\
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
    print(countriesList)

    # dict with all JSON information
    jsonDict = {}

    # fill root of dict with country codes, who's value is a dict with food items and production values and a dict with total production values
    for country in countriesList:
        jsonDict[country] = {
                                "items": {},
                                "total_production": {}
                            }

    # fill dict with relevant information from CSV
    for row in datasetReader:
        try:
            jsonDict[row[0]]["items"][row[3]]
        except KeyError:
            jsonDict[row[0]]["items"][row[3]] = {}
            jsonDict[row[0]]["items"][row[3]]["production"] = {}
        jsonDict[row[0]]["items"][row[3]]["name"] = row[4]

        # add yearly production value information, merging food and feed info
        for i in range(10, 63):
            try:
                if row[i]:
                    jsonDict[row[0]]["items"][row[3]]["production"][str(i + 1951)] += int(row[i])
            except KeyError:
                if row[i]:
                    jsonDict[row[0]]["items"][row[3]]["production"][str(i + 1951)] = int(row[i])


    # reset production csv reader to beginning of file and skip first row
    productionCsv.seek(0)
    next(productionReader)

    # add total production per country per year information
    for row in productionReader:
        for i in range(1, 54):
            jsonDict[row[0]]["total_production"][str(i + 1960)] = row[i]

    print(jsonDict["USA"]["items"]["2511"])

    # dump dict as JSON file
    json.dump(jsonDict, outfile)
