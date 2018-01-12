import csv
import os

with open(os.path.relpath("../doc/dataset.csv"), encoding='latin-1') as file:
    reader = csv.reader(file)

    # first row with information about columns; name of first country
    columnDescription = next(reader)
    country = next(reader)[2]

    # boolean to check whether in new row
    newRow = True

    # lists to keep track of products counted; dict with counter for products
    productsListFoodFeed = []
    productsList = []
    totalProducedDict = {}


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

        for value in row:

            # if current column has produce value, add value to totalProduced
            if (columnDescription[columnIndex][:1] == 'Y'):
                if newRow == True:
                    if not row[4] in productsList:
                        if value:
                            totalProduced = int(value)
                        else:
                            totalProduced = 0
                    else:
                        if value:
                            print("hier")
                            totalProduced += int(value)
                else:
                    if value:
                        totalProduced += int(value)

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
