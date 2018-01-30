import csv
import os
import json

# open files, initialize readers for CSV files
with open(os.path.relpath("../doc/WorldPopulation.csv")) as populationCsv,\
    open(os.path.relpath("../doc/WITS_country_codes.csv")) as countryCodesCsv,\
    open(os.path.relpath("../doc/dataset.csv"), encoding='latin-1') as dataset,\
    open(os.path.relpath("../doc/total_production.csv"), encoding='latin-1') as productionCsv,\
    open(os.path.relpath("../doc/dataset_foodgroups.json"), "w") as outfile:
    countryCodesReader = csv.reader(countryCodesCsv)
    datasetReader = csv.reader(dataset)
    productionReader = csv.reader(productionCsv)
    populationReader = csv.reader(populationCsv)

    # skip first rows of input CSV's
    next(countryCodesReader)
    next(productionReader)
    next(datasetReader)
    next(populationReader)

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
                                "total_production": {},
                                "population": {},
                                "name": ""
                            }

    # fill dict with relevant information from CSV
    for row in datasetReader:
        if row[3][:2] == "29":
            try:
                jsonDict[row[0]]["items"][row[3]]
            except KeyError:
                jsonDict[row[0]]["items"][row[3]] = {}
                jsonDict[row[0]]["items"][row[3]]["production"] = {}
            jsonDict[row[0]]["items"][row[3]]["name"] = row[4]

            # add yearly production value information
            for i in range(10, 63):
                try:
                    if row[i]:
                        jsonDict[row[0]]["items"][row[3]]["production"][str(i + 1951)] += int(row[i])
                except KeyError:

                    # delete this line to merge food and feed info
                    if row[6] == "Food":

                        if row[i]:
                            jsonDict[row[0]]["items"][row[3]]["production"][str(i + 1951)] = int(row[i])


    # reset production csv reader to beginning of file and skip first row
    productionCsv.seek(0)
    next(productionReader)

    # add total production per country per year information
    for row in productionReader:
        for i in range(1, 54):
            jsonDict[row[0]]["total_production"][str(i + 1960)] = row[i]

    for row in populationReader:
        print(row)
        print(row[1])
        country = row[1]
        print(country)
        try:
            jsonDict[country]["population"]
            print("hier")
            for i in range(4, 58):
                jsonDict[country]["population"][str(i + 1956)] = row[i]
        except KeyError:
            pass

    for row in countryCodesReader:
        print(row)
        try:
            jsonDict[row[1]]["name"] = row[0]
        except KeyError:
            pass

    # dump dict as JSON file
    json.dump(jsonDict, outfile)
