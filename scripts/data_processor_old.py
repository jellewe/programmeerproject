import csv
import os

with open(os.path.relpath("../doc/dataset.csv"), encoding='latin-1') as file:
    reader = csv.reader(file)

    # first row with information about columns; name of first country
    columnDescription = next(reader)
    row1 = next(reader)
    countryCode = row1[0]
    country = ''

    # boolean to check whether in new row
    newRow = True

    # lists to keep track of products counted; dict with counter for products
    productsListFoodFeed = []
    productsList = []
    totalProducedDict = {}
    countriesTotalProduction = {}

    # iterate over rows in file, add all values of a certain food type together
    for row in reader:

        newRow = True
        # if new country, set boolean to true and print dict for old country
        newCountry = False
        if not country == row[2]:
            newCountry = True
            # print("\n" + country + str(totalProducedDict))
            productsListFoodFeed = []
            productsList = []

            # calculate total of produced goods for old country and reset dict
            totalProduction = 0
            for key, value in totalProducedDict.items():
                print(type(value))
                totalProduction += value[0]
            countriesTotalProduction[countryCode] = totalProduction
            totalProducedDict = {}
            countryCode = row[0]

            # print(totalProduction)

        # update country name, set column index and total produced of new country to 0
        country = row[2]
        columnIndex = 0
        # totalProduced = 0

        # if product already counted (some duplicates in data file), continue to next row
        # print(productsList)
        # print(row[4] + row[6])
        if not row[4] + row[6] in productsListFoodFeed:
            productsListFoodFeed.append(row[4] + row[6])
        else:
            newRow = True
            continue

        if newCountry == True:
            totalProducedDict[countryCode] = []
            for value in row:
                if columnDescription[columnIndex][:1] == 'Y':
                    # index = int(columnDescription[columnIndex][-4:]) - 1961
                    totalProducedDict[countryCode].append(0)
                columnIndex += 1
        columnIndex = 0

        for value in row:

            # if current column has produce value, add value to totalProduced
            if (columnDescription[columnIndex][:1] == 'Y'):
                if newRow == True:
                    if not row[4] in productsList:
                        if value:
                            totalProduced = int(value)
                        else:
                            # print(row[4] + " reset 0")
                            totalProduced = 0
                    else:
                        if value:
                            totalProduced += int(value)
                else:
                    if value:
                        totalProduced += int(value)

                if value:
                    index = int(columnDescription[columnIndex][-4:]) - 1961
                    totalProducedDict[countryCode][index] += int(value)


                # set new row to false
                newRow = False

            # add 1 to column index
            columnIndex += 1

        if not row[4] in productsList:
            productsList.append(row[4])

        # update dict for current country
        totalProducedDict[row[4]] = totalProduced
        newRow = True

    # print final country's information
    print(country + str(totalProducedDict))

    # calculate total of produced goods
    totalProduction = 0
    for key, value in totalProducedDict.items():
        totalProduction += value
    countriesTotalProduction[countryCode] = totalProduction

    # print(totalProduction)

with open(os.path.relpath("../doc/total_production.csv"), 'w') as outfile:
    writer = csv.writer(outfile)
    row = "country total_production "
    for i in range(52):
        row += ("Y" + str(i + 1961) + " ")

    writer.writerow(row.split())
    for country, value in countriesTotalProduction.items():
        string = countryCode + "_" + str(value)
        writer.writerow(string.split("_"))
